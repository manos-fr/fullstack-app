import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  encryptedPassword: any;
  decryptedPassword: any;

  constructor(private encrService: EncryptService) {}

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signUp(): void {
    this.encryptedPassword = this.encrService.set(
      '123456$#@$^@1ERF',
      `${this.signUpForm.controls.newPassword.value}`
    );
    this.decryptedPassword = this.encrService.get(
      '123456$#@$^@1ERF',
      this.encryptedPassword
    );
    console.log([
      {
        email: this.signUpForm.controls.email.value,
        username: this.signUpForm.controls.userName.value,
        encryptedPassword: this.encryptedPassword,
      },
    ]);
  }
}
