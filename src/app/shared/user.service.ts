import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';
import * as firebase from 'firebase';
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
logOut(){
  localStorage.removeItem('userToken'); 
}
writeUserData(user:User):Promise<User> {
 return firebase.database().ref('users/' + user.Uid).set({
    firstname: user.FirstName,
    lastname: user.LastName,
    email: user.Email,
    type:user.Type
  });
}

}
