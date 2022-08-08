import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.createAccForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPwd: ['', [Validators.required, MustMatch]],
    },
      {
        validator: MustMatch('password', 'confirmPwd')
      });
  }

  get myForm() {
    return this.createAccForm.controls;
  }

  clearData() {
    this.createAccForm.reset();
  }

  createAcc() {
    const payload = {
      name: this.createAccForm.controls['name'].value,
      email: this.createAccForm.controls['email'].value,
      password: this.createAccForm.controls['password'].value,
      confirmPwd: this.createAccForm.controls['confirmPwd'].value
    };
    this.userSvc.createAccount(payload).then((dist) => {
    });
    this.router.navigate(["/login"]);
  }

}
