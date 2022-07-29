import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm!: FormGroup;

  userInfo: any;
  userId: any;
  eachUser: any;
  password: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPassword: ['', [Validators.required, MustMatch]]
    },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      });
     this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
     this.password = this.userInfo.password;
  }
  
  public myError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  onSubmit(formValue: any) {
      if (this.password !== formValue.oldPassword) {
        this.snackBar.open('Incorrect Password!', '', { duration: 3000 });
      } else {
        this.router.navigate(['user-profile']);
        this.snackBar.open('Password Change Successfully!', '', { duration: 3000 });
      }
    } 

  clearForm() {
     this.passwordForm.reset();
  }

}
