import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../api.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private api: ApiService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //if (await this.api.checkAuth().toPromise()) {
        if (this.api.me()) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/user/signin'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
