import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name:string = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  email:string = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  userProfileImg:string = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  emailVerified:boolean = JSON.parse(sessionStorage.getItem('loggedInUser')!).email_verified;
  constructor() { }

  ngOnInit(): void {
  }

}
