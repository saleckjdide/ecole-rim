import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sig-up-etape2',
  templateUrl: './sig-up-etape2.component.html',
  styleUrls: ['./sig-up-etape2.component.css']
})
export class SigUpEtape2Component implements OnInit {
  user: User;
  male:string='Homme';
  female:string='Femme';
  prof:string='prof';
  etu:string='etu';
  selected:number=1;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  erreur:string;
  isLoading=false;
 
  constructor(private  userService :UserService, private router:Router) { }
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
  ngOnInit(): void {
    this.resetForm();
  }
  OnSubmit(form: NgForm) {
    this.isLoading=true;
    this.user=form.value;
    this.user.Uid=localStorage.getItem('uid');
    this.user.Email=localStorage.getItem('userToken');
    this.user.Active=true;
    console.log(this.user);
   var response= this.userService.writeUserData(this.user);
   //console.log(response);
    this.router.navigate(['/login']);
    this.resetForm();
    this.isLoading=false;
     }
}
