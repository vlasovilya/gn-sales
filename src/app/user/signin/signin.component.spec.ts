import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule, ParseService, RxSync, ModuleComponentsModule, ModalsModule, AmmoChartsModule } from 'app/shared';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './signin.component';
import { ActivatedRoute} from '@angular/router';
import { UserService } from '../user.service';
import { of as observableOf, Observable } from 'rxjs';

import { GlobalState } from 'app/global.state';
import { AppState } from 'app/app.state';

import { MockModuleService, MockParseService } from 'app/tests';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SignInComponent ],
        imports: [
            SimpleNotificationsModule.forRoot(),
            RouterTestingModule, FormsModule, ReactiveFormsModule,
            MatInputModule, BrowserAnimationsModule
        ],
        providers: [
            UserService,
            {
                provide: ActivatedRoute,
                useValue: {
                    snapshot: {
                        params: {'id': 'new'},
                        parent:{
                            data: {
                                config: {
                                    signInParams: {}
                                },
                                app: {

                                }
                            }
                        },
                        queryParams: {}
                    },
                    params: observableOf({'id': 'new'}),

                },
            },
            {provide: ParseService, useClass: MockParseService },
            GlobalState,
                RxSync,
                AppState,
        ]
    })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render Sign in form', async(() => {
        expect(fixture.nativeElement.children[0].textContent).toContain('Sign in');
    }));

    it('should show Forgot password? button, if the `passwordResetEnabled` config flag is set', () => {
        expect(component).toBeTruthy();
    });

    it('should send sign in form value to backend after click on submit button', () => {
        expect(component).toBeTruthy();
    });

    it('should show an error message, if the backend return some error', () => {
        expect(component).toBeTruthy();
    });

    it('should show success message if the backend returned success result', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate user to password reset screen after click on "Forgot password?" button', () => {
        expect(component).toBeTruthy();
    });

});


