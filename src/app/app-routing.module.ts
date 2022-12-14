import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    //pathMatch: 'full',
    resolve: { },
    data: {
        breadcrumbs: 'Home'
    },
    children:[
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: 'login',
    redirectTo: '/user/signin'
  },
  {
    path: 'registration',
    redirectTo: '/user/signup'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'top',
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
