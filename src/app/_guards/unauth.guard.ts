import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../api.service';
import { map, catchError, of } from 'rxjs';

@Injectable()
export class UnAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private api: ApiService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.api.checkAuth().pipe(map(res=>{
          this.router.navigate(['/']);
          return false;
        }), catchError(()=>{
          return of(true);
        }))
    }
}
