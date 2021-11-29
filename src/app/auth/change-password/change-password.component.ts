import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  forgotForm: FormGroup;
  encryptedOldPassword: any;
  encryptedNewPassword: any;
  constructor(private encrService: EncryptService) {}

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
    this.encryptedOldPassword = this.encrService.set(
      '123456$#@$^@1ERF',
      `${this.forgotForm.controls.oldPassword.value}`
    );
    this.encryptedNewPassword = this.encrService.set(
      '123456$#@$^@1ERF',
      `${this.forgotForm.controls.newPassword.value}`
    );
    console.log({
      encryptedOldPassword: this.encryptedOldPassword,
      encryptedNewPassword: this.encryptedNewPassword,
    });
  }
}
