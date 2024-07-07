declare var google:any;
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NASAImage, NASAImageItem } from 'src/app/shared/interfaces/INasa.Interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  determineMediaType(nasaImage: NASAImageItem): 'image' | 'video' | undefined {
    if (nasaImage.data && Array.isArray(nasaImage.data) && nasaImage.data.length > 0) {
      const firstData = nasaImage.data[0];
      return firstData.media_type === 'image' ? 'image' : 'video';
    } else if (nasaImage.data && !Array.isArray(nasaImage.data)) {
      return nasaImage.data.media_type === 'image' ? 'image' : 'video';
    }
    return undefined;
  }

  signOut(){
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('loggedInUser');
    this.route.navigate(['/']);
  }

}
