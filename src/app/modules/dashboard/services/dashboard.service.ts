declare var google:any;
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NASAImage, NASAImageItem } from 'src/app/shared/interfaces/INasa.Interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient,private route:Router) { }

  getSearchPost(search: string): Observable<NASAImage> {
    return this.httpClient.get<NASAImage>(`${this.baseUrl}/search?q=${search}`);
  }

  getRecentPosts(): Observable<NASAImage> {
    return this.httpClient.get<NASAImage>(`${this.baseUrl}/asset/?orderby=recent`);
  }

  getPopularPosts(): Observable<NASAImage> {
    return this.httpClient.get<NASAImage>(`${this.baseUrl}/asset/?orderby=popular`);
  }


  extractMediaUrl(links: any[]): string | undefined {
    const videoLink = links.find(link => link.rel === 'preview_video' || link.rel === 'preview');
    return videoLink?.href;
  }

  extractCaptionsUrl(links: any[]): string | undefined {
    const captionsLink = links.find(link => link.rel === 'captions');
    return captionsLink?.href;
  }

  determineMediaType(nasaImage: NASAImageItem): Observable<{ type: 'image' | 'video' | undefined, videoUrl?: string }> {
    if (nasaImage.data && Array.isArray(nasaImage.data) && nasaImage.data.length > 0) {
      const firstData = nasaImage.data[0];
      const typeVideo = firstData.media_type === 'image' ? 'image' : 'video';
      
      if (typeVideo === 'video') {
        const url = nasaImage.href;
        return this.getVideo(url).pipe(
          map(videoUrls => {
            const firstMp4Url = videoUrls.find(url => url.endsWith('orig.mp4'));
            return { type: 'video', videoUrl: firstMp4Url };
          })
        );
      }
      
      return of({ type: typeVideo });
      
    } else if (nasaImage.data && !Array.isArray(nasaImage.data)) {
      const typeVideo = nasaImage.data.media_type === 'image' ? 'image' : 'video';
      
      if (typeVideo === 'video') {
        const url = nasaImage.href;
        return this.getVideo(url).pipe(
          map(videoUrls => {
            const firstMp4Url = videoUrls.find(url => url.endsWith('orig.mp4'));
            return { type: 'video', videoUrl: firstMp4Url };
          })
        );
      }
      
      return of({ type: typeVideo });
    }
    
    return of({ type: undefined });
  }

  getVideo(collections: string): Observable<string[]> {
    return this.httpClient.get<string[]>(collections);
  }
  
    signOut(){
      google.accounts.id.disableAutoSelect();
      sessionStorage.removeItem('loggedInUser');
      this.route.navigate(['/']);
    }

}
