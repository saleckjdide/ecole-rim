import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';
interface authResponseData{
  idToken: string;
  email: string;
  refreshToken:string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}
@Injectable()
export class UserService {
  
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    console.log(user);
   return  this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1Scu5kcoMb12fGbAcB08-j3pCnZah52I',
   {
     email:user.Email,
     password:user.Password,
     returnSecureToken:true
    }
  );
  }

  userAuthentication(userName, password) {

    return  this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1Scu5kcoMb12fGbAcB08-j3pCnZah52I',
    {
      email:userName,
      password:password,
      returnSecureToken:true
     }
   );
  }

  getUserClaims(){
   
  }

}
