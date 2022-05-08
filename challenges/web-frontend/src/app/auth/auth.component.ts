import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { form } from '../constants/form-constants';
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
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          FormCustomValidation.patternValidator(form.emailPattern, {
            hasEmail: true,
          }),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get(form.email);
  }

  get password() {
    return this.loginForm.get(form.password);
  }

  private onLogin() {
    this.loginForm.value = {
      ...this.loginForm.value,
      userMailId: this.loginForm.value.email,
    };
    this.auth.authenticateuser(this.loginForm.value);
  }

  public loginUser() {
    this.onLogin();
  }
}
