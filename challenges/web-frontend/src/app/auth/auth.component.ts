import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../constants/contants';
import { FormCustomValidation } from '../utilities/form-custom-validation';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public loginForm: any;
  public hide: boolean = true;

  public constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          FormCustomValidation.patternValidator(AppConstants.emailPattern, {
            hasEmail: true,
          }),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get(AppConstants.email);
  }

  get password() {
    return this.loginForm.get(AppConstants.password);
  }

  private onLogin() {
    this.loginForm.value = {
      email: this.loginForm.value.email,
      ...this.loginForm.value,
      userMailId: this.loginForm.value.email,
    };
    this.auth.authenticateuser(this.loginForm.value);
    this.router.navigate(['/auction']);
  }

  public loginUser() {
    this.onLogin();
  }
}
