import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {  BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth"; 

import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { User } from '../shared/user.model';

interface authResponseData{
  idToken: string;
  email: string;
  refreshToken:string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}
export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken:string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
   user :User;
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,private http :HttpClient,
    private afAuth: AngularFireAuth
  ) {
    firebase.initializeApp(environment.firebase)
  }

  login(user: User){
    if (user.Email !== '' && user.Password !== '' ) { // {3}
      
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1Scu5kcoMb12fGbAcB08-j3pCnZah52I',
      {
        email:user.Email,
        password:user.Password,
        returnSecureToken:true
       }
     );
    
    }
  }
  setLogIn(value:boolean){
    this.loggedIn.next(value);
  }
 setUser(user:User){
    this.user=user;
 }
  registerUser(user: User) {
   
   return  this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1Scu5kcoMb12fGbAcB08-j3pCnZah52I',
   {
     email:user.Email,
     password:user.Password,
     returnSecureToken:true
    }
  );
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  getUser(id:string):Promise<User>{
  return firebase.database().ref('/users/' + id).
   once('value').then(function(snapshot) {
     return  snapshot.val() ;
      
     });
  }
  getCurrentUser(){
    return this.user;
  }
  resetPasswordInit(email: string) { 
    return this.afAuth.sendPasswordResetEmail(
      email, 
      { url: 'http://localhost:4200/login' }); 
    } 
}
