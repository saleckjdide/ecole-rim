import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../auth/user';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

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
  private user :User;
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router,private http :HttpClient
  ) {
    firebase.initializeApp(environment.firebase)
  }

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) { // {3}
      
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1Scu5kcoMb12fGbAcB08-j3pCnZah52I',
      {
        email:user.userName,
        password:user.password,
        returnSecureToken:true
       }
     );
     /*.subscribe(user=>{
    
      this.getUser(user.localId).then(use=>{
       if(use){
        this.loggedIn.next(true);
        this.user=use;
        this.router.navigate(['/detailuser']);
        localStorage.setItem('userToken',user.email);
      }else{
        //inscription
        this.loggedIn.next(false);
        localStorage.setItem('uid',user.localId);
        localStorage.setItem('userToken',user.email);
        this.router.navigate(['/inscription']);
      }
     
    });
  
     });*/
     // 
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
     email:user.email,
     password:user.password,
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
 
}
