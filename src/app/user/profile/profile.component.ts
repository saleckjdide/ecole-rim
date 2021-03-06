import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/shared/user.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
firstname :string;
user :User;
  constructor(private serviceUser:UserService, private route : Router, private authService :AuthService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('userToken')){
      this.route.navigate(['/login']);
    }
  this.user=this.authService.getCurrentUser();
  console.log(this.user);
    this.firstname=localStorage.getItem('userToken');
  }
logOut(){
  //this.serviceUser.logOut();
  this.authService.logout();
  this.route.navigate(['/login']);
}
}
