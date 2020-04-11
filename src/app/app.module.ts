import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import {  MatToolbarModule, } from "@angular/material/toolbar";
import {  MatSidenavModule, } from "@angular/material/sidenav";
import {  MatListModule, } from "@angular/material/list";
import {   MatButtonModule, } from "@angular/material/button";
import {   MatIconModule, } from "@angular/material/icon";
import { HeaderComponent } from './header/header.component';
import { AppMaterialModule } from './app-material/app-material.module';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    DetailUserComponent,
    LoadingSpinnerComponent,
    HeaderComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
   AppMaterialModule, ReactiveFormsModule
  ],
  providers: [UserService
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
