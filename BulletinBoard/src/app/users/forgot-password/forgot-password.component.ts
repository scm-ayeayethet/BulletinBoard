import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlainmodalComponent } from 'src/app/components/plainmodal/plainmodal.component';
import { USERS } from 'src/app/constants/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPwdForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.forgotPwdForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    })
  }

  get myForm() {
    return this.forgotPwdForm.controls;
  }

  forgotPassword(){
    const result = USERS.find(data => data.email === this.forgotPwdForm.controls['email'].value);
    if(result){
      this.router.navigate(["/resetPwd"]);
    }else{
      this.dialog.open(PlainmodalComponent, {
        width: '30%',
        data: {
          content: `Email dosen't exit...`,
          note: '',
          applyText: 'Ok'
        }
      });
    }
  }

}
