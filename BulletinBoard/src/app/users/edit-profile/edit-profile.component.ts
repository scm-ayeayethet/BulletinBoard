import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { USERS } from 'src/app/constants/constants';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

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
  public userForm!: FormGroup;
  public userId: number = 0;
  public userData: any;
  public existingUser: any;
  public isEditUser: boolean = true;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      type: new FormControl(0),
      phone: new FormControl('', [Validators.required,
      Validators.pattern("^[0-9]{11}$")
      ]),
      dob: new FormControl(''),
      address: new FormControl(''),
      //profile : new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const info: any = localStorage.getItem('userInfo') || "";
    const data = JSON.parse(info);
    this.userInfoId = data._id;

    this.userId = this.activatedRoute.snapshot.params['id'];

    this.existingUser = USERS.filter(res => { return res.id == this.userId; });
    
      if (this.existingUser) {
        this.userForm.controls['name'].setValue("update");
        this.userForm.controls['email'].setValue("update@gmail.com");
        this.userForm.controls['type'].setValue( 1 );
        this.userForm.controls['phone'].setValue('09780987890');
        this.userForm.controls['dob'].setValue("2022-05-04T07:00:00.000Z" );
        this.userForm.controls['address'].setValue("update");
      }
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
