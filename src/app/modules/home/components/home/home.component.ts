declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '@home/services/home.service';
import { NASAImage, NASAImageItem, NASAImageData, Card } from 'src/app/shared/interfaces/INasa.Interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nasaImages: NASAImageItem[] = [];
  cards: Card[] = [];
  sortOrder: string = '';
  clientId:string = environment.client_id;
  constructor(private homeService: HomeService,private router:Router) { }

  ngOnInit(): void {

    google.accounts.id.initialize({
      client_id:this.clientId,
      callback:(resp:any)=> this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      width: '240',
      height: '50',
      longtitle: true,
      onsuccess: (resp:any)=>{
        console.log('Respuesta',resp);
      },
      onfailure: (resp:any)=>{
        console.log('Respuesta',resp);
      }
    });

    this.homeService.getRecentPosts().subscribe(
      (data: NASAImage) => {
        
        data.collection.items.forEach((nasaImage: NASAImageItem) => {

          if (nasaImage.links && nasaImage.links.length > 0) {
            const mediaUrl = this.homeService.extractMediaUrl(nasaImage.links);
            const captionsUrl = this.homeService.extractCaptionsUrl(nasaImage.links);
            const mediaType = this.homeService.determineMediaType(nasaImage);
            
            if (mediaUrl && mediaType=== 'image') {
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

  getPostsRecentsPopular(): void {
    this.cards = [];

    const handleData = (data: NASAImage) => {
      data.collection.items.forEach((nasaImage: NASAImageItem) => {
        if (nasaImage.links && nasaImage.links.length > 0 ) {
          const mediaUrl = this.homeService.extractMediaUrl(nasaImage.links);
          const captionsUrl = this.homeService.extractCaptionsUrl(nasaImage.links);
          const mediaType = this.homeService.determineMediaType(nasaImage);
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
      this.homeService.getRecentPosts().subscribe(handleData, handleError);
    } else {
      this.homeService.getPopularPosts().subscribe(handleData, handleError);
    }
  }
  

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response:any){
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      this.router.navigate(['/dashboard']);
    }
  }

  optionLogin(){
    google.accounts.id.prompt();
  }

}
