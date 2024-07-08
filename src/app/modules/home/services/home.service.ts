
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NASAImage, NASAImageItem } from 'src/app/shared/interfaces/INasa.Interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl: string = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }


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

  determineMediaType(nasaImage: NASAImageItem): 'image' | 'video' | undefined {
    if (nasaImage.data && Array.isArray(nasaImage.data) && nasaImage.data.length > 0) {
      const firstData = nasaImage.data[0];
      return firstData.media_type === 'image' ? 'image' : 'video';
    } else if (nasaImage.data && !Array.isArray(nasaImage.data)) {
      return nasaImage.data.media_type === 'image' ? 'image' : 'video';
    }
    return undefined;
  }



}
