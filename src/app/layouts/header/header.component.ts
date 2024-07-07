import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.updateUserInfo(); 

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isActiveRoute('/dashboard') || this.isActiveRoute('/wish-list') || this.isActiveRoute('/profile')) {
        this.updateUserInfo();
      }
    });
  }

  isActiveRoute(routePath: string): boolean {
    return this.router.url.includes(routePath);
  }

  updateUserInfo(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setTimeout(() => {
        const user = JSON.parse(loggedInUser);
        this.name = decodeURIComponent(user.given_name);
      });
    } else {
      this.name = '';
    }
  }

  logout(): void {
    this.authService.signOut(); 
  }
}
