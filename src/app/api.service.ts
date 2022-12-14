import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { User } from './_models';
import * as _ from 'lodash';

export interface QueryParams {
  className: string;
  condition: any;
  limit: number;
  offset?: number;
  include?: string[];
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public serverUrl: string='';

  public apiUrl: string= this.serverUrl+(!environment.production ? '/api' : '');

  public currentUser:any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get(endpoint:string, params?:any): Observable<any[] | any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      params
    };
    return this.http.get(this.apiUrl+'/'+endpoint, httpOptions);
  }
  post(endpoint:string, data?:any): Observable<any[] | any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };
    return this.http.post(this.apiUrl+'/'+endpoint, {data}, httpOptions);
  }

  me() : User {
    this.checkAuth().subscribe(res=>{
      //console.log(res);
    }, err=>{
      //console.log(err);
      this.logout();
    });
    return localStorage.getItem('gn-user') ? JSON.parse(localStorage.getItem('gn-user')) : null;
  }

  checkAuth(): Observable<any[] | any> {
    const _hsq = window['_hsq'];
    return this.get('checkLogin').pipe(map(res=>{
      //console.log(res);
      if (!res || !res.userData){
        localStorage.setItem('gn-user', '');
        this.currentUser=null;
        return false;
      }
      this.currentUser=res.userData;

      localStorage.setItem('gn-user', JSON.stringify(res.userData));
      return this.currentUser;
    }))
  }

  logout(){
    this.post('logout').subscribe(res=>{
      console.log(res);
      localStorage.setItem('gn-user', '');
      this.currentUser=null;
      this.router.navigate(['/user/signin']);
      if (window['_chatlio']){
        window['_chatlio'].hide()
      }
    })

  }

  login(username:string, password:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    return this.http.post(this.apiUrl+'/login', {username, password}, httpOptions).pipe(map((res: HttpResponse<any>)=>{
      //console.log(res);
      //console.log('response headers', res.headers.keys(), res.headers)
      const user=res.body.userData;
      if (user){
        localStorage.setItem('gn-user', JSON.stringify(user));
        return user;
      }
      throw new Error('Access Denied');;
    }))
  }

  downloadWorksheet(lessonId:number, lessonPrefix:string, buttonType:string, modelId:number) {
    return this.post('units/downloadWorksheet', {
      lesson_id: lessonId,
      type: buttonType,
      lessonPrefix,
      modelid: modelId
    }).pipe(map(res=>{
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', res.results.replace('http://', '//'));
      downloadLink.setAttribute('download', res.name);
      downloadLink.click();
      return res;
    }))
  }

  find(queryParams:QueryParams): Observable<any[]> {
    return this.post('automation/api/find', queryParams).pipe(map(res=>res.result));
  }
  count(queryParams:QueryParams): Observable<number> {
    return this.post('automation/api/count', _.pick(queryParams, 'className', 'condition')).pipe(map(res=>res.result));
  }
}
