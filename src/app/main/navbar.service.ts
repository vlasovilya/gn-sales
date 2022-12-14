import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NavbarService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      //console.log(event, event['routerEvent']['urlAfterRedirects']);
      if (event['routerEvent'] && event['routerEvent']['urlAfterRedirects']) {
        //console.log(event);
        this.currentUrl.next(event['routerEvent']['urlAfterRedirects']);
      }
    });
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }
}
