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
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.cards = [];
    const hasFilters = this.filters.some(filter => filter.checked);
    const applyFilters = (nasaImage: NASAImageItem) => {
      const mediaType = this.dashboardService.determineMediaType(nasaImage);
      return !hasFilters || (mediaType && this.filters.some(filter => filter.type === mediaType && filter.checked));
    };

    const handleData = (data: NASAImage) => {
      data.collection.items.forEach((nasaImage: NASAImageItem) => {
        if (nasaImage.links && nasaImage.links.length > 0 && applyFilters(nasaImage)) {
          const mediaUrl = this.dashboardService.extractMediaUrl(nasaImage.links);
          const captionsUrl = this.dashboardService.extractCaptionsUrl(nasaImage.links);
          const mediaType = this.dashboardService.determineMediaType(nasaImage);
          if (mediaUrl && mediaType) {
            this.cards.push({
              mediaUrl,
              info: nasaImage.data.title || '',
              mediaType,
              captionsUrl
            });
          }
        }
      });
    };

    const handleError = (error: any) => {
      console.error('Error al obtener datos:', error);
    };

    if (this.searchText === '' ) {
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
    if (this.sortOrder === 'recents' || this.sortOrder === 'popular' ) {
      this.getPostsRecentsPopular();
    } else if (this.searchText !== '' || this.searchText !== undefined || this.searchText !== null) {
      this.getPosts();
    }
  }

  onSearchTextChanged(searchText: string): void {
    this.searchText = searchText;
    this.sortOrder = '';
    this.getPosts();
  }

  onSortChanged(sortOption:string): void {
    this.sortOrder = sortOption as 'recents' | 'popular';
    this.getPostsRecentsPopular();
  }

  getPostsRecentsPopular(): void {
    this.cards = [];
    const hasFilters = this.filters.some(filter => filter.checked);
    const applyFilters = (nasaImage: NASAImageItem) => {
      const mediaType = this.dashboardService.determineMediaType(nasaImage);
      return !hasFilters || (mediaType && this.filters.some(filter => filter.type === mediaType && filter.checked));
    };

    const handleData = (data: NASAImage) => {
      data.collection.items.forEach((nasaImage: NASAImageItem) => {
        if (nasaImage.links && nasaImage.links.length > 0 && applyFilters(nasaImage)) {
          const mediaUrl = this.dashboardService.extractMediaUrl(nasaImage.links);
          const captionsUrl = this.dashboardService.extractCaptionsUrl(nasaImage.links);
          const mediaType = this.dashboardService.determineMediaType(nasaImage);
          if (mediaUrl && mediaType) {
            this.cards.push({
              mediaUrl,
              info: nasaImage.data.title || '',
              mediaType,
              captionsUrl
            });
          }
        }
      });
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
