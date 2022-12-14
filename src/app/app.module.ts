import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { UserModule } from './user/user.module';
import { ApiService } from './api.service';
import { AuthGuard, UnAuthGuard } from './_guards';
import { AppService } from './app.service';

import { SharedModule } from './shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarMenuComponent } from './main/navbar-menu/navbar-menu.component';
import { NavbarMenuItemComponent } from './main/navbar-menu-item/navbar-menu-item.component';
import { NavbarService } from './main/navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    NavbarMenuComponent,
    NavbarMenuItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    UserModule,
    LoadingBarRouterModule,
    SharedModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    UnAuthGuard,
    AppService,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
