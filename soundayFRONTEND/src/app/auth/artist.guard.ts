import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const userJson = localStorage.getItem('accessData');
    const accessData = userJson ? JSON.parse(userJson) : null;

    return this.authSvc.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn && accessData && accessData.user.roles === "ARTIST") {
          return true;
        } else {
          this.router.navigate(['homepage']);
          return false;
        }
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
