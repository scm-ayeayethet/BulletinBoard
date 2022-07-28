import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS } from 'src/app/constants/constants';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-user-create-confirm',
  templateUrl: './user-create-confirm.component.html',
  styleUrls: ['./user-create-confirm.component.scss']
})
export class UserCreateConfirmComponent implements OnInit {

  confirmView : boolean = false;
  value!: number;
  label!: string;
  profileImage: any;
  Imageloaded:boolean = false;
  imgFile:any;
  userInfoId:any;
  typeOption = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'User' }
  ];
  userForm!: FormGroup;
  public userId: number = 0;
  public userData: any;
  public existingUser: any;
  public isEditUser: boolean = true;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private changeDetector:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const info: any = localStorage.getItem('userInfo') || "";
    const data = JSON.parse(info);
    this.userInfoId = data._id;

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPwd: ['', [Validators.required, MustMatch]],
      type: [0],
      phone: ['', [Validators.required,
      Validators.pattern("^[0-9]{11}$")
      ]],
      dob: [''],
      address: [''],
      //profile : ['', [Validators.required]]
    },
      {
        validator: MustMatch('password', 'confirmPwd')
      });
  }

  get myForm() {
    return this.userForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  clearData() {
    if (this.confirmView == true) {
      this.userForm.controls['name'].enable();
      this.userForm.controls['email'].enable();
      this.userForm.controls['password'].enable();
      this.userForm.controls['confirmPwd'].enable();
      this.userForm.controls['address'].enable();
      this.userForm.controls['type'].enable();
      this.userForm.controls['dob'].enable();
      this.userForm.controls['phone'].enable();
      //this.userForm.controls['profile'].enable();
      this.confirmView = false;
    } else {
      this.userForm.reset();
    }
  }

  confirmUser() {
    if (this.confirmView == true) {
      this.router.navigate(["users-list"]);
    }

    if (this.userForm.valid) {
      this.userForm.controls['name'].disable();
      this.userForm.controls['email'].disable();
      this.userForm.controls['password'].disable();
      this.userForm.controls['confirmPwd'].disable();
      this.userForm.controls['address'].disable();
      this.userForm.controls['type'].disable();
      this.userForm.controls['dob'].disable();
      this.userForm.controls['phone'].disable();
      //this.userForm.controls['profile'].disable();
      this.confirmView = true;
    }
  }
  
  // imageUpload(event: any) {
  //   var file = event.target.files.length;
  //   for(let i=0;i<file;i++)
  //   {
  //      var reader = new FileReader();
  //      reader.onload = (event:any) =>
  //      {
  //          this.profileImage = event.target.result;
  //          this.changeDetector.detectChanges();
  //      }
  //      reader.readAsDataURL(event.target.files[i]);
  //   }
  // }

  // handleImageLoad()
  // {
  //   this.Imageloaded = true;
  // }

}
