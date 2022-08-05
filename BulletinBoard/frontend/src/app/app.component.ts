import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bulletinboard-ojt';
  showNavBar = true;
  user: any = null;
  userData: any;
  userInfo:any;

  constructor(
    private router: Router,
    private authSvc : AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/login' || this.router.url === '/') {
          this.showNavBar = false;
        } else {
          this.showNavBar = true;
        }
        this.user = localStorage.getItem('userLoginData');
        this.user = JSON.parse(this.user);
      }
    });
  }

  ngOnInit(): void {
  }

  public profile(userId:any) {
    // const data: any = localStorage.getItem('userLoginData') || "";
    // this.userInfo = JSON.parse(data)._id;
    this.router.navigate(['/user-profile/' + userId]);
  }

  logout() {
    this.authSvc.logout().then((dist: any) => {
      //localStorage.removeItem('userId');
      localStorage.clear();
      this.authSvc.isLoggedIn();
      this.router.navigate(['/login']);
    });
  }
}