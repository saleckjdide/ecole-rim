import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  male:string='Homme';
  female:string='Femme';
  prof:string='prof';
  etu:string='etu';
  selected:number=1;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  erreur:string;
  isLoading=false;
  constructor(private userService: UserService, private toastr: ToastrService,private router : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      Uid:'',
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
      Sexe:'',
      Brithday:new Date('1900-01-01'),
      Active:true,
      Type:'etu',
      ConfirmPassword:''
    }
  }
  checkPasswords(form: NgForm) { // here we have the 'passwords' group
  let pass = form.value.ConfirmPassword;
  let confirmPass = form.value.Password;

  return pass === confirmPass ? null : { notSame: true }     
}
  OnSubmit(form: NgForm) {
 this.isLoading=true;
 console.log(form.value);
    this.userService.registerUser(form.value)
      .subscribe(resData=>{
        this.user.Uid=resData.localId;
        this.user.Active
        
       var response= this.userService.writeUserData(this.user);
       console.log(response);
        this.router.navigate(['/login']);
        this.resetForm();
        this.isLoading=false;
      },
        errorRes=>{
            console.log(errorRes.error.error.message);
            this.isLoading=false;
          switch(errorRes.error.error.message)
          {
            case 'EMAIL_EXISTS':
              this.erreur="L'email existe déjà";
          }
          this.resetForm();
        }
        );
  }

}
