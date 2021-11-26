import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  forgotForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.initForgotForm();
  }

  initForgotForm() {
    this.forgotForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  changePassword(): void {
    console.log(this.forgotForm.value);
  }
}
