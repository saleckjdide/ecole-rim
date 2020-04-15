import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
 isLoginError : boolean = false; 
  isLoading=false;
  /* 
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
    
  
  }*/
  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         
    private authService: AuthService ,
    private router:Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {

    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.form.value);
      /*.subscribe((data : any)=>{
        console.log(data);
        
       localStorage.setItem('userToken',data.email);
       this.router.navigate(['/detailuser']);
       this.isLoading=false;
     },
     (err : HttpErrorResponse)=>{
       this.isLoginError = true;
       this.isLoading=false;
     });
    }else{
      this.isLoginError=true;
    }*/
  }
    this.formSubmitAttempt = true;             // {8}
  }

}
