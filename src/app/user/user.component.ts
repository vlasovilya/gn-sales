import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';
import { UserService } from './user.service';
import { ApiService } from '../api.service';
import { map, Observable, shareReplay } from 'rxjs';
import { AppService } from 'app/app.service';


@Component({
    selector: 'my-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {
    private hidden: boolean=false;
    public currentAction: string='';
    private logged: boolean=false;
    public backUrl: string='';
    public appName: string='';
    public logoUrl: string='';
    public isDesktop: boolean;

    screenSize: Observable<string> = this.appService.screenSize
    .pipe(
      map(result => {
        //console.log(result);
        this.isDesktop=['lg','xl'].indexOf(result)>=0
        return result;
      }),
      shareReplay()
    );


    constructor(
        private router: Router,
        private userService: UserService,
        private api: ApiService,
        private route: ActivatedRoute,
        private appService: AppService,
    ) {
        //console.log(this.route, router);
        this.userService.backUrl = '';//router['prevUrl'];
        //console.log(this.userService['backUrl']);
        router.events.subscribe((event: NavigationStart) => {
            const url=event['url'] || '';
            if (event instanceof NavigationStart) {
                this.hidden = event.url.indexOf('/user') !== 0 ? true : false;
            }
            if (event instanceof NavigationEnd) {

                this.currentAction=url.split('/')[2];
                if (this.currentAction){
                    this.currentAction=this.currentAction.split('?')[0];
                }
                //console.log(this.currentAction);
            }
        });

        const app=this.route.snapshot.data['app'];
        if (app && app.logo){
            this.logoUrl=app.logo.url;
        }
    }

    isActive(path){
        //console.log(path);
        return this.currentAction && this.currentAction.indexOf(path)===0;
    }

    goBack() {
        this.router.navigate([this.backUrl || '/']);
        return false;
    }

    setLogged(value: boolean) {
        //console.log(value);
        this.logged = value;
    }
}
