import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Model, Unit, User } from '../_models';
import { ApiService } from '../api.service';
import { ActivatedRoute, ActivationEnd, NavigationEnd, ResolveStart, Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { Subscription } from 'rxjs';
import * as _ from "lodash";
import { MatSidenav } from '@angular/material/sidenav';

export interface MenuItem {
  title: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
}

@Component({
  selector: 'gn-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{

  screenSize: Observable<string> = this.appService.screenSize
    .pipe(
      map(result => {
        //console.log(result);
        this.isDesktop=['lg','xl'].indexOf(result)>=0
        return result;
      }),
      shareReplay()
    );

  scrollDisabled: Observable<boolean> = this.appService.scrollDisabled;

  @ViewChild('drawer') public drawer: MatSidenav;

  public models:Model[];
  public currentModel:Model;
  public showHelp: boolean=false;
  public units:Unit[];
  public routeData: any;
  public activeUnitId:number;
  public isDesktop: boolean;
  public user:User;

  private unitsSubscription:Subscription;

  public menuItems: MenuItem[]=[
    {title: 'Dashboard', path: '/', icon: 'dashboard'},
  ];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
  ) {
    this.models=this.route.snapshot.data.grades;
    this.user=this.apiService.me();

    //console.log(this.route.snapshot, this.route.snapshot.url, this.route.snapshot.children.length);



    this.router.events.subscribe((event: NavigationEnd) => {
      //console.log(event);

      this.activeUnitId=parseInt(this.route.snapshot.children[0]?.children[0]?.params.unitId);
      if (event instanceof ResolveStart){
          this.routeData={};
          this.checkRouteData(this.route.snapshot);
      }
      if (event instanceof ActivationEnd){
          this.routeData={};
          this.checkRouteData(this.route.snapshot);
          this.appService.routeData=this.routeData;
          this.appService.routeDataChanged.next(this.appService.routeData);
      }

      if (event instanceof NavigationEnd){
          //console.log(event);
          if (this.drawer && !this.isDesktop){
              this.drawer.close();
          }

          const hash=this.route.snapshot.fragment;
          if (hash){
            setTimeout(()=>{
              this.scrollToElement(document.getElementById(hash));
            }, 200);
          }
          else {
            document.querySelector('.mat-drawer-content').scrollTo({top: 0});
          }
          //

      }

  });
  }

  ngOnInit() {
    this.unitsSubscription=this.appService.model.subscribe(model=>{
      //console.log(model);
      this.units=model.units;
      this.currentModel=model;
      this.units.forEach(unit=>{
        unit.selected=this.activeUnitId===unit.unitId;
      })
    });
    /*
    const models=this.route.snapshot.data.grades;
      this.subscription=this.route.data.subscribe(data=>{
        if (!data.model){
          this.router.navigate(['/model/'+models[0].modelId])
        }
        else {
          this.model=data.model;
        }
      })
    */

  }

  scrollToElement(el): void {
    //console.log(el);
    const yOffset=-80;
    if (el){
      //el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      const y = el.offsetTop + yOffset;
      //console.log(y);
      document.querySelector('.mat-drawer-content').scrollTo({top: y, behavior: 'smooth'});



    }

  }

  checkRouteData(route){
    this.routeData=_.extend(this.routeData, route.data);
    if (route.firstChild){
        this.checkRouteData(route.firstChild);
    }
}

  logout(){
    this.apiService.logout();
  }

  ngOnDestroy() {
    this.unitsSubscription.unsubscribe();
  }

}
