import { Component, OnInit } from '@angular/core';
import { HomeService } from '@home/services/home.service';
import { NASAImage, NASAImageItem, NASAImageData, Card } from 'src/app/shared/interfaces/INasa.Interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nasaImages: NASAImageItem[] = [];
  cards: Card[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getRecentPosts().subscribe(
      (data: NASAImage) => {
        
        data.collection.items.forEach((nasaImage: NASAImageItem) => {

          if (nasaImage.links && nasaImage.links.length > 0) {
            const mediaUrl = this.homeService.extractMediaUrl(nasaImage.links);
            const captionsUrl = this.homeService.extractCaptionsUrl(nasaImage.links);
            const mediaType = this.homeService.determineMediaType(nasaImage);
            
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


}
