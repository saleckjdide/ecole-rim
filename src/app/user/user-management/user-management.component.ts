import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: User;
  isLoading=false;
  frmSetNewPassword = this.fb.group({
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  });
  constructor(private router : Router,private afAuth: AngularFireAuth, private activateRoute: ActivatedRoute, private fb :FormBuilder) { }

  ngOnInit(): void {
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
  OnSubmit(form:NgForm) {
const code = this.activateRoute.snapshot.queryParams['oobCode'];

this.afAuth
  .confirmPasswordReset(code, form.value.Password)
  .then(() => {this.router.navigate(['/login'])})
  .catch(err => {
   const errorMessage = "Erreur"; // check this helper class at the bottom
  });

  }
}
