import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor() {}

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
    console.log(this.signUpForm.value);
  }
}
