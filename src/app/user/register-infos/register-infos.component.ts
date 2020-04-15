import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-infos',
  templateUrl: './register-infos.component.html',
  styleUrls: ['./register-infos.component.css']
})
export class RegisterInfosComponent implements OnInit {

  
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr: ToastrService) { 
    
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: '',
   
    }
  }

  OnSubmit(form: NgForm) {
   // this.userService.addUser(localStorage.getItem("userToken"),form.value.FirstName,form.value.LastName,form.value.Email,form.value.Adresse);
     /* .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else
          this.toastr.error(data.Errors[0]);
      });*/
  }



}
