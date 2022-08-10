import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPwdForm!: FormGroup;
  emailErr = '';

  constructor(
    private authSvc: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.forgotPwdForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.get('forgetPassword') === 'failed') {
        this.emailErr = 'Your token has expired. Please try again';
      }
    })
  }

  get myForm() {
    return this.forgotPwdForm.controls;
  }

  resetPassword() {
    let payload = {
      email: this.forgotPwdForm.controls['email'].value
    };
    this.authSvc.forgetPassword(payload).then((dist: any) => {
      this.emailErr = "Email sent with password reset instructions.";
    }).catch((err: any) => {
      this.emailErr = "Email does not exist.";
    });
  }
}
