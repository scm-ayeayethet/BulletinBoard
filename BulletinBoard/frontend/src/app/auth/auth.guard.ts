import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: any;

  constructor(private router: Router,
    private authSvc: AuthService) {
    this.authSvc.authUser$.subscribe((data) => {
      this.user = data;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authSvc.isLoggedIn();
    if (!this.user) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
