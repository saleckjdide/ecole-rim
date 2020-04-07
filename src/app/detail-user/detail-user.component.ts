import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
firstname :string;
  constructor() { }

  ngOnInit(): void {
    this.firstname=localStorage.getItem('userToken');
  }

}
