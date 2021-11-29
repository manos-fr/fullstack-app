import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  sendPasswordForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initSendPasswordForm();
  }
  initSendPasswordForm() {
    this.sendPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      otp: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  sendPassword(): void {
    console.log(this.sendPasswordForm.value);
  }
}
