import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title, Meta }     from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { Model, Unit } from './_models';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  public screenSize: ReplaySubject<string> = new ReplaySubject(2);
  public model: ReplaySubject<Model> = new ReplaySubject(2);
  public routeDataChanged: ReplaySubject<any> = new ReplaySubject(2);
  public scrollDisabled: ReplaySubject<boolean> = new ReplaySubject(2);

  public routeData: any;

  public currentScreenSize: string;
  public currentModel: Model;

  public isMobile:boolean;
  public isTablet:boolean;
  public isDesktop:boolean;

  public defaultLanguage: string='english';

  constructor(
    protected titleService: Title,
    protected metaTagService: Meta,
    private dialog: MatDialog,
  ) {

    this.screenSize.subscribe(size=>{
      this.isMobile=size==='sm';
      this.isTablet=size==='md';
      this.isDesktop=size==='lg';
      this.currentScreenSize=size;
    });
    this.model.subscribe(model=>{
      this.currentModel=model;
    });
  }

  setMetaTags(data){
    if (data.title){
        this.titleService.setTitle( data.title );
    }
    /*
    ['keywords', 'description'].forEach(key=>{
        if (data[key]){
            this.metaTagService.updateTag({name: key, content: data[key]});
        }
    });
    */
  }

}
