
import {catchError} from 'rxjs/operators';

import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
const dashboadUrl='/';

@Component({
  selector: 'my-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../user.component.scss']
})
export class SignInComponent implements OnInit {

    @HostBinding('class') classes:string='signin-component';

    public form: FormGroup;
    public returnUrl: string;
    public errorMessage: string='';
    public config: any= {

    };
    public loginInProgress:boolean=false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public api:ApiService,
        private builder: FormBuilder,
        private userService:UserService,
    ) {
        this.form = this.builder.group({
          username: [''],
          password: [''],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || dashboadUrl;
        const configData=this.route.snapshot.parent?.data['config'];
        if (configData){
            this.config=configData.signInParams;
        }
    }

    onSubmit(values:any) {
      if (!values.username || !values.password){
        return;
      }
      this.loginInProgress=true;
      this.api.login(values.username, values.password).pipe(catchError((error)=>{
        //console.log(error);
        this.errorMessage='Invalid Username or Password';
        this.api.logout();
        this.loginInProgress=false;
        return observableThrowError(error);
    })) .subscribe((res)=>{
        //console.log(res);
        this.loginInProgress=false;
        this.router.navigate([this.returnUrl]);
    });
      /*
        this.parse.waterfall([
            ()=>this.parse.logIn(values.username, values.password),
            ()=>{
                const query=this.parse.query('_Role');
                return this.parse.find(query);
            }
        ]).pipe(catchError((error)=>{
            //console.log(error);
            this.errorMessage=error.code !== 101 ? 'Access denied' : error.message;
            this.cd.detectChanges();
            return this.parse.waterfall([
                ()=>this.parse.logOut(),
                ()=>observableThrowError(error)
            ]);
        }))
        .subscribe(()=>{
            this.router.navigate([this.returnUrl]);
            this.cd.detectChanges();
        });
        return;
        */
    }

    ngOnInit() {
        //console.log('Hello Home');
    }

    goToPassReset(){
        this.userService.username=this.form.value.username;
        this.router.navigate(['/user/reset']);
    }

    cleverLogin(){
      const url='https://clever.com/oauth/authorize?response_type=code&redirect_uri=';
      const redirectUri = window.location.protocol + '//' + window.location.host + '/oauth/clever';
      const clientId = '&client_id=f899830f6d7d95792e08';
      const state = '&state=fb37f982-925b';
      const completeRedirectURI = url + redirectUri + clientId + state;
      window.location.href = completeRedirectURI;
      //this.router.navigateByUrl(completeRedirectURI)
    }

}
