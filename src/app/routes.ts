import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';

import { SignInComponent } from './user/sign-in/sign-in.component';

import { AuthGuard } from './auth/auth.guard';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

//import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
   // { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
   {
    path: 'detailuser', component: DetailUserComponent
    //children: [{ path: '', component: SignUpComponent }]
},
    {
        path: 'signup', component: SignUpComponent
       
    },/*
    {
        path: 'login', component: UserComponent
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}*/
    { path: '', component: HomeComponent},
    { path: 'login', component:SignInComponent  }
    
];