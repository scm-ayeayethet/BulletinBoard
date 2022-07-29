import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlainmodalComponent } from 'src/app/components/plainmodal/plainmodal.component';
import { USERS } from 'src/app/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', [Validators.required]),
      rememberme: ['']
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    const result = USERS.find(data => data.email === this.loginForm.controls['email'].value && data.password === this.loginForm.controls['password'].value);
    if (result) {
      if (result.type === 0) {
        this.router.navigate(["/posts-list"]);
      }
      else {
        this.router.navigate(["/posts-list"]);
      }
      localStorage.setItem("userInfo", JSON.stringify(result));
    } else {
      this.dialog.open(PlainmodalComponent, {
        data: {
          content: `Email or password is incorrect...`,
          note: '',
          applyText: 'Ok'
        }
      });
    }
  }
}

