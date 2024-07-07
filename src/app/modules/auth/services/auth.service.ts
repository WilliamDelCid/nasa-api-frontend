declare var google:any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) { }


  signOut(){
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('loggedInUser');
    this.route.navigate(['/']);
  }

}
