import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlainmodalComponent } from 'src/app/components/plainmodal/plainmodal.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPwdForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.resetPwdForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPwd: ['', [Validators.required]],
      });
  }

  get myForm() {
    return this.resetPwdForm.controls;
  }

  resetPassword(){
    if(this.resetPwdForm.controls['password'].value && this.resetPwdForm.controls['confirmPwd'].value
    && this.resetPwdForm.controls['password'].value === this.resetPwdForm.controls['confirmPwd'].value)
    {
      this.router.navigate(["/login"]);
    }
    else{
      this.dialog.open(PlainmodalComponent, {
        data: {
          content: `Password and ConfirmPassword must be match...`,
          note: '',
          applyText: 'Ok'
        }
      });
    }
  }

}
