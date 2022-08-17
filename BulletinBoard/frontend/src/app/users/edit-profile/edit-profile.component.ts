import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  confirmView: boolean = false;
  profileImage: any;
  Imageloaded: boolean = false;
  imgFile: any;
  userInfoId: any;
  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];
  pickDate: any;
  today = new Date();
  userData: any;
  public userID: any;
  public user: any;
  public userForm!: FormGroup;
  public existingUser: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userSvc: UserService
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      type: new FormControl(),
      phone: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]{11}$")
      ]),
      dob: new FormControl(''),
      address: new FormControl(''),
      profile: new FormControl('')
    });
  }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];
    const payload = {};
    this.userSvc.findUser(payload, id).then((dist) => {
      this.userData = dist.data;
      if (this.userData) {
        this.userForm.controls['name'].setValue(this.userData.name);
        this.userForm.controls['email'].setValue(this.userData.email);
        this.userForm.controls['phone'].setValue(this.userData.phone);
        this.userForm.controls['address'].setValue(this.userData.address);
        this.userForm.controls['type'].setValue(this.userData.type);
        this.userForm.controls['dob'].setValue(this.userData.dob);
        this.profileImage = 'http://localhost:5000/' + this.userData.profile;
      }
    });
    const data: any = localStorage.getItem('userLoginData') || "";
    this.user = JSON.parse(data);
    this.userID = this.user._id;
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
      this.userForm.controls['address'].enable();
      this.userForm.controls['type'].enable();
      this.userForm.controls['dob'].enable();
      this.userForm.controls['phone'].enable();
      this.userForm.controls['profile'].enable();
      this.confirmView = false;
    } else {
      this.userForm.reset();
    }
  }

  confirmUser() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    if (this.confirmView == true) {
      const formData = new FormData();
      formData.append('name', this.userForm.controls['name'].value);
      formData.append('email', this.userForm.controls['email'].value);
      formData.append('type', this.userForm.controls['type'].value);
      formData.append('phone', this.userForm.controls['phone'].value);
      formData.append('dob', this.userForm.controls['dob'].value);
      formData.append('address', this.userForm.controls['address'].value);
      this.imgFile ? formData.append('profile', this.imgFile) : "";
      formData.append('updated_user_id', this.userID);

      this.userSvc.updateUser(formData, id).then((dist) => {
        this.router.navigate(['users-list']);
      })
    }
    if (this.userForm.valid) {
      this.userForm.controls['name'].disable();
      this.userForm.controls['email'].disable();
      this.userForm.controls['address'].disable();
      this.userForm.controls['type'].disable();
      this.userForm.controls['dob'].disable();
      this.userForm.controls['phone'].disable();
      this.userForm.controls['profile'].disable();
      this.confirmView = true;
    }
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }
}
