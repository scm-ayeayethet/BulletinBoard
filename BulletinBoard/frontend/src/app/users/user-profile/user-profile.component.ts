import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileImage:any;
  userData: any;
  public userInfo: any;

  public name! : string;
  public email! : string;
  public type! : string;
  public dob! : string;
  public address! :string;
  public phone! :string;
  public profile! : string

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private userSvc : UserService
    ) { }

  ngOnInit(): void {
    const id :string = this.activatedRoute.snapshot.params['id'];
    const payload = {};
    this.userSvc.findUser(payload,id).then((dist) => {
      this.userData = dist.data;
      if (this.userData) {
        this.name = this.userData.name;
        this.email = this.userData.email;
        this.phone = this.userData.phone;
        this.address = this.userData.address;
        this.type = this.userData.type;
        this.dob = this.userData.dob;
        this.profileImage = 'http://localhost:5000/' + this.userData.profile;
      }
    })
    
  }

  editProfile(){
    const data: any = localStorage.getItem('userLoginData') || "";
    this.userInfo = JSON.parse(data)._id;
    this.router.navigate(["/edit-profile/", this.userInfo]);
  }

}
