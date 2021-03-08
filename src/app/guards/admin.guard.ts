import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AdminService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.admin$.pipe(
      take(1),
      map((admin) => (admin ? true : false)),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      })
    );
  }
}
