import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  type: any;
  admin: boolean = false;
  constructor(
    private router : Router,
    ) { }

  ngOnInit(): void {
    
     this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    if (this.userInfo.type == 0) {
      this.type = 'Admin';
      this.admin = false;
    } else {
      this.type = 'User';
      this.admin = true;
    }
  }

  editProfile(userId:any){
    this.router.navigate(['/edit-profile/' + userId]);
  }

}
