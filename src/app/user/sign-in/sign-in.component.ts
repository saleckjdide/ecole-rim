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
  isLoginError: boolean = false;
  isLoading = false;

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      Email: ['', Validators.required],
      Password: ['', Validators.required]
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
      this.isLoading = true;
      this.authService.login(this.form.value).subscribe(user => {
        this.authService.getUser(user.localId).then(use => {
          if (use) {
            this.authService.setLogIn(true);
            this.authService.setUser(use);
            this.router.navigate(['/detailuser']);
            localStorage.setItem('userToken', user.email);
          } else {
            //inscription
            this.authService.setLogIn(false);
            localStorage.setItem('uid', user.localId);
            localStorage.setItem('userToken', user.email);
            this.router.navigate(['/inscription']);
          }

        }
        );

      }, (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.isLoading = false;
      });

      this.isLoading = false;
    } else {
      this.isLoginError = true;
    }
    this.formSubmitAttempt = true;
  }
  resetPassword() { 
    if (!this.form.value.Email) { 
      alert('Merci de remplire le champ e-mail'); 
    }
    this.authService.resetPasswordInit(this.form.value.Email) 
    .then(
      () => alert('Un lien de réintialisation de mot de passe a été envoyé sur votre e-mail'), 
      (rejectionReason) => "") 
    .catch(e => alert("Une erreur s'est produite lors de la tentative de remise en sécurité de votre mot de passe")); 
  }
}
