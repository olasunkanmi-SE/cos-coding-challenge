import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { form } from '../constants/form-constants';
import { FormCustomValidation } from '../utilities/form-custom-validation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public loginForm: any;
  public hide: boolean = true;

  constructor(private formBuilder: FormBuilder) {}
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
}
