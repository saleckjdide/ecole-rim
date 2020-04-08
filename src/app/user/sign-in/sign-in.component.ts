import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false; 
  isLoading=false;
  constructor(private userService : UserService,private router : Router) { }
 
  ngOnInit() {
    if(localStorage.getItem('userToken')){
      this.router.navigate(['/detailuser']);
    }
  }

  OnSubmit(userName,password){
    this.isLoading=true;
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
       console.log(data);
       
      localStorage.setItem('userToken',data.email);
      this.router.navigate(['/detailuser']);
      this.isLoading=false;
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
      this.isLoading=false;
    });
    
  
  }

}
