import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@dashboard/services/dashboard.service';
import { Card, NASAImage, NASAImageItem } from 'src/app/shared/interfaces/INasa.Interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards: Card[] = [];
  searchText = '';
  filters: { type: string, checked: boolean }[] = [];
  sortOrder: string = '';
  favoriteMediaUrls: string[] = [];
  userEmail: string = '';
  loading:boolean = false;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadFavoriteMediaUrls();
    this.getPosts();
  }

  loadFavoriteMediaUrls(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.userEmail = JSON.parse(loggedInUser).email;
      const favoriteCardsJson = localStorage.getItem(this.userEmail);
      if (favoriteCardsJson) {
        const favoriteCards = JSON.parse(favoriteCardsJson);
        this.favoriteMediaUrls = favoriteCards.map((card: Card) => card.mediaUrl);
      }
    }
  }

  getPosts(): void {
    this.loading = true;
    this.cards = [];
    const applyFilters = async (nasaImage: NASAImageItem) => {
      const hasFilters = this.filters.some(filter => filter.checked);
      const mediaType = await this.dashboardService.determineMediaType(nasaImage).toPromise();
      
      return !hasFilters || (mediaType && this.filters.some(filter => filter.type === mediaType.type && filter.checked));
    };

    const handleData = (data: NASAImage) => {
      data.collection.items.forEach(async (nasaImage: NASAImageItem) => {
        if (nasaImage.links && nasaImage.links.length > 0 &&  await applyFilters(nasaImage)) {
          const mediaUrl = this.dashboardService.extractMediaUrl(nasaImage.links);
          const captionsUrl = this.dashboardService.extractCaptionsUrl(nasaImage.links);
          const mediaType = await this.dashboardService.determineMediaType(nasaImage).toPromise();
          if (mediaUrl && mediaType) {
            if (nasaImage.data && Array.isArray(nasaImage.data) && nasaImage.data.length > 0) {
            const firstData = nasaImage.data[0];   
            const isFavorite = this.favoriteMediaUrls.includes(mediaUrl);
            this.cards.push({
              mediaUrl,
              info: firstData.title || '',
              mediaType: mediaType.type,
              captionsUrl,
              favorite: isFavorite,
              iconFavorite: isFavorite             ? 'assets/images/heart-like-filled.svg'
            : 'assets/images/heart-like-outline.svg',
            description: firstData.description,
            urlVideo: mediaType.type === 'video' ? mediaType.videoUrl : ''
            });           
            }
          }
        }
      });
      this.loading = false;
    };

    const handleError = (error: any) => {
      console.error('Error al obtener datos:', error);
    };

    if (this.searchText === '') {
      this.dashboardService.getRecentPosts().subscribe(handleData, handleError);
    } else {
      this.dashboardService.getSearchPost(this.searchText).subscribe(handleData, handleError);
    }
  }

  onFilterChanged(filter: { type: string, checked: boolean }): void {
    const existingFilter = this.filters.find(f => f.type === filter.type);
    if (existingFilter) {
      existingFilter.checked = filter.checked;
    } else {
      this.filters.push(filter);
    }
    if (this.sortOrder === 'recents' || this.sortOrder === 'popular') {
      this.getPostsRecentsPopular();
    } else {
      this.getPosts();
    }
  }

  onSearchTextChanged(searchText: string): void {
    this.searchText = searchText;
    this.sortOrder = '';
    this.getPosts();
  }

  onSortChanged(sortOption: string): void {
    this.sortOrder = sortOption;
    this.getPostsRecentsPopular();
  }

  getPostsRecentsPopular(): void {
    this.loading = true;
    this.cards = [];
    const applyFilters = async (nasaImage: NASAImageItem) => {
      const hasFilters = this.filters.some(filter => filter.checked);
      const mediaType = await this.dashboardService.determineMediaType(nasaImage).toPromise();
      
      return !hasFilters || (mediaType && this.filters.some(filter => filter.type === mediaType.type && filter.checked));
    };

    const handleData = (data: NASAImage) => {
      data.collection.items.forEach(async (nasaImage: NASAImageItem) => {
        if (nasaImage.links && nasaImage.links.length > 0 &&  await applyFilters(nasaImage)) {
          const mediaUrl = this.dashboardService.extractMediaUrl(nasaImage.links);
          const captionsUrl = this.dashboardService.extractCaptionsUrl(nasaImage.links);
          const mediaType = await this.dashboardService.determineMediaType(nasaImage).toPromise();

          if (mediaUrl && mediaType) {
            if (nasaImage.data && Array.isArray(nasaImage.data) && nasaImage.data.length > 0) {
            const firstData = nasaImage.data[0];   
            const isFavorite = this.favoriteMediaUrls.includes(mediaUrl);
            this.cards.push({
              mediaUrl,
              info: firstData.title || '',
              mediaType: mediaType.type,
              captionsUrl,
              favorite: isFavorite,
              iconFavorite: isFavorite             ? 'assets/images/heart-like-filled.svg'
            : 'assets/images/heart-like-outline.svg',
            description: firstData.description,
            urlVideo: mediaType.type === 'video' ? mediaType.videoUrl : ''
            });          
            }
          }
        }
      });
    this.loading = false;

    };

    const handleError = (error: any) => {
      console.error('Error al obtener datos:', error);
    };

    if (this.sortOrder === 'recents') {
      this.dashboardService.getRecentPosts().subscribe(handleData, handleError);
    } else {
      this.dashboardService.getPopularPosts().subscribe(handleData, handleError);
    }
  }
}
