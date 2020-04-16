import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';

import { SignInComponent } from './user/sign-in/sign-in.component';

import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SigUpEtape2Component } from './sig-up-etape2/sig-up-etape2.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ProfileComponent } from './user/profile/profile.component';


//import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
   // { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
   {
    path: 'detailuser', component: ProfileComponent
    //children: [{ path: '', component: SignUpComponent }]
},
    {
        path: 'signup', component: SignUpComponent
       
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'},
    { path: 'login', component:SignInComponent  },
    { path: 'inscription', component:SigUpEtape2Component  },
    { path: 'changepassword', component:ChangePasswordComponent  }
    
    
];