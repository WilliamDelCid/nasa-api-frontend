import { Component, OnInit } from '@angular/core';
import { HomeService } from '@home/services/home.service';
import { Card, NASAImage, NASAImageItem } from 'src/app/shared/interfaces/INasa.Interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nasaImages: NASAImageItem[] = [];
  cards: Card[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getRecentPosts().subscribe(
      (data: NASAImage) => {
        
        data.collection.items.forEach((nasaImage: NASAImageItem) => {

          if (nasaImage.links && nasaImage.links.length > 0) {
            const mediaUrl = this.extractMediaUrl(nasaImage.links);
            const captionsUrl = this.extractCaptionsUrl(nasaImage.links);
            const mediaType = this.determineMediaType(nasaImage);
            
            if (mediaUrl && mediaType) {
              this.cards.push({
                mediaUrl: mediaUrl,
                info: nasaImage.data.title || '', 
                mediaType: mediaType,
                captionsUrl: captionsUrl 
              });
            }
          }
        });
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  private extractMediaUrl(links: any[]): string | undefined {
    const videoLink = links.find(link => link.rel === 'preview_video' || link.rel === 'preview');
    return videoLink?.href;
  }

  private extractCaptionsUrl(links: any[]): string | undefined {
    const captionsLink = links.find(link => link.rel === 'captions');
        
    return captionsLink?.href;
  }

  private determineMediaType(nasaImage: NASAImageItem): 'image' | 'video' | undefined {
    if (nasaImage.data && Array.isArray(nasaImage.data) && nasaImage.data.length > 0) {
      const firstData = nasaImage.data[0];
      return firstData.media_type === 'image' ? 'image' : 'video';
    } else if (nasaImage.data && !Array.isArray(nasaImage.data)) {
      return nasaImage.data.media_type === 'image' ? 'image' : 'video';
    }
    return undefined;
  }
  
}
