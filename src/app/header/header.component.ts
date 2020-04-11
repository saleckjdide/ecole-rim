import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;  
  isLogin:boolean=false;   
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    
    this.isLogin=localStorage.getItem('tokenUser')!=null;
    console.log(this.authService.isLoggedIn);
  }
  onLogout(){
    this.authService.logout();
  }
}
