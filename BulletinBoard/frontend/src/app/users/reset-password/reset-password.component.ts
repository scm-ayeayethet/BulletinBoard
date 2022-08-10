import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPwdForm!: FormGroup;
  public errorMsg: string = '';
  public userId: string = '';
  public token: string = '';
  public passwordMatch: boolean = true;
  public userData: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {

    this.resetPwdForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.token = this.activatedRoute.snapshot.params['token'];

    this.authSvc.resetPassword(this.userId, this.token).then((data: any) => {
      this.resetPwdForm = new FormGroup({
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      });
    }).catch((err: any) => {
      this.router.navigate(['/forget-password', { forgetPassword: "failed" }]);
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetPwdForm.controls[controlName].hasError(errorName);
  }

  resetPassword() {
    if (this.resetPwdForm.controls['password'].value && this.resetPwdForm.controls['confirmPassword'].value &&
      this.resetPwdForm.controls['password'].value !== this.resetPwdForm.controls['confirmPassword'].value) {
      this.errorMsg = "Password and Password confirmation are not matched";
    } else {
      const payload = {
        password: this.resetPwdForm.controls['password'].value
      }
      this.authSvc.resetPasswordUpdate(this.userId, this.token, payload).then((dist) => {

      })
      this.router.navigate(['/login']);
    }
  }
}