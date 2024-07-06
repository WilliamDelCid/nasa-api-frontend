import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NASAImage } from 'src/app/shared/interfaces/INasa.Interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl: string = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }


  getRecentPosts(): Observable<NASAImage> {
    return this.httpClient.get<NASAImage>(this.baseUrl+'/asset/?orderby=recent');
  }

  // getVideo(collections:string):Observable<string[]>{
  //   return this.httpClient.get<string[]>(collections);

  // }
}
