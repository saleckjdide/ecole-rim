import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { ProfileComponent } from './user/profile/profile.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { HeaderComponent } from './header/header.component';

import{AngularFireModule} from '@angular/fire'
import { MaterialModule } from './material-module/material-module.module';
import { SigUpEtape2Component } from './user/sig-up-etape2/sig-up-etape2.component';
import { EqualValidator } from './equal-validator.directive';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';






@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    SigUpEtape2Component,
    EqualValidator,
    UserManagementComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    AngularFireModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
   
  ],
  providers: [UserService
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
