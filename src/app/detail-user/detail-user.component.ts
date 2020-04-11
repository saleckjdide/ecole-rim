import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
firstname :string;
  constructor(private serviceUser:UserService, private route : Router, private authService :AuthService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('userToken')){
      this.route.navigate(['/login']);
    }
    this.firstname=localStorage.getItem('userToken');
  }
logOut(){
  //this.serviceUser.logOut();
  this.authService.logout();
  this.route.navigate(['/login']);
}
}
