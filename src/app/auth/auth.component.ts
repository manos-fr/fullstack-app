import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
// import { LoginService } from '../services/login.service';
// import { UserService } from '../../user-role-management/services/user.service';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { EncryptService } from '../services/encrypt.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  captchaImage: any;
  encryptedPassword: any;

  constructor(private encrService: EncryptService) {} // private domSanitizer: DomSanitizer // private messageService: MessageService, // private userService: UserService, // private route: ActivatedRoute, // private loginService: LoginService, // private router: Router,

  ngOnInit(): void {
    // this.loginService.getCaptcha().subscribe((res: any) => {
    //  if(res && res.captcha) {
    //   this.captchaImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + res.captcha);
    //   return;
    //  }
    // })
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      captcha: new FormControl(''),
    });
  }

  doUserLogin(): void {
    this.encryptedPassword = this.encrService.set(
      '123456$#@$^@1ERF',
      `${this.loginForm.controls.password.value}`
    );
    console.log({
      username: this.loginForm.controls.userName.value,
      encryptedPassword: this.encryptedPassword,
    });
    // this.loginService.loginUser(this.loginForm.value).subscribe((res: any) => {
    //   if(res && res.body.captcha) {
    //     if (this.captchaImage) {
    //       this.messageService.add({severity: 'error', summary: 'Error', detail: res.body.captchamessage, life: 5000});
    //     }
    //     this.captchaImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + res.body.captcha);
    //     return;
    //   }
    //   const userDetails = res.body;
    //   const token = res.headers.get('Authorization');
    //   this.userService.userDetails = userDetails;
    //   this.userService.token = token;
    //   localStorage.userDetails = JSON.stringify(userDetails);
    //   localStorage.token = token;
    //   const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl')
    //   if (userDetails.firstLogin) {
    //     this.router.navigate(['/user-role-management/change-password']);
    //   }  else if (redirectUrl) {
    //     this.router.navigate([redirectUrl]);
    //   } else if (userDetails.customerEnabled) {
    //     this.router.navigate(['/customer']);
    //   } else {
    //     this.router.navigate([`/user-role-management/users`]);
    //   }
    // },
    // (err: any) => {
    //   if(err?.error?.errors) {
    //     this.messageService.add({severity: 'error', summary: 'Error', detail: err?.error?.errors, life: 5000});
    //   }
    // });
  }
}
