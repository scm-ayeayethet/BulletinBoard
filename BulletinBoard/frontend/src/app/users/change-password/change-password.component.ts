
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/must-match.validator';
// import * as bcrypt from 'bcrypt';
// import { bcrypt } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';

@Component({
  selector:'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls:['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm!: FormGroup;

  userInfo: any;
  userId: any;
  userData: any;
  password: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userSvc: UserService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPassword: ['', [Validators.required, MustMatch]]
    },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      });
    this.userInfo = localStorage.getItem('userLoginData') || "";
    this.userId = JSON.parse(this.userInfo)._id;
    this.password = this.userInfo.password;
    // console.log(this.password)
  }

  public myError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const payload = {};
      this.userSvc.findUser(payload, this.userId).then((dist) => {
        this.userData= dist.data;
        const salt = bcrypt.genSaltSync(12);
//  const pass = bcrypt.hashSync(this.passwordForm.controls['oldPassword'].value, salt);
//  console.log(pass);
 console.log(this.userData.password)
      if(this.passwordForm.controls['oldPassword'].value === this.userData.password){
 console.log("Success")
      }
      })
      //console.log(this.passwordForm.controls['oldPassword'].value);
      // if (this.password !== this.passwordForm.controls['oldPassword'].value) {
      //   this.snackBar.open('Incorrect Password!', '', { duration: 3000 });
      // } else {
      //   this.router.navigate(['users-profile']);
      //   this.snackBar.open('Password Change Successfully!', '', { duration: 3000 });
      // }
    }
  }

  clearForm() {
    this.passwordForm.reset();
  }

}
