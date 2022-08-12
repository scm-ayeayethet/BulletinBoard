import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginErrMsg = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService
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
    const payload = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    }
    this.authSvc.login(payload).then(dist => {
      localStorage.setItem('token', dist.token);
      localStorage.setItem('userLoginData', JSON.stringify(dist.user));
      this.router.navigate(["/posts-list"]);
    }).catch(err => {
      this.loginErrMsg = `Email or password is incorrect...`;
    }
    )
  }
}

