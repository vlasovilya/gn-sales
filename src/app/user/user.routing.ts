import { ModuleWithProviders }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserComponent } from './user.component';
import { SignInComponent } from './signin/signin.component';
import { UnAuthGuard } from 'app/_guards';



const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        data: {
            layout: 'user',
        },
        resolve: {

        },
        canActivate: [UnAuthGuard],
        children: [

          {
            path: 'signin',
            component: SignInComponent,
          }

        ]
    }
];

export const userRouting: ModuleWithProviders<RouterModule>  = RouterModule.forChild(userRoutes);
