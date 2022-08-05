import { ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USERS } from 'src/app/constants/constants';
import * as moment from 'moment';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'created_user_id', 'phone', 'dob', 'address', 'created_at', 'updated_at', 'action'];
  dataSource!: MatTableDataSource<any>;
  userList: any = [];
  infoList: any = [];
  eachUser: any;
  userInfo: any;
  username = "";
  email = "";
  fromDate = "";
  toDate = "";
  today = new Date();

  public dataSubject: any = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userSvc: UserService
  ) {
    this.dataSubject = this.userSvc.dataSubject;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

    // this.userInfo = JSON.parse(localStorage.getItem('userLoginData') || '[]');
    this.getUserData();
  }

  getUserData() {
    this.userSvc.getUsers().then((dist) => {
      this.userList = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.userList);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUserData(userId: any) {
    this.userSvc.deleteUser(userId).then((dist) => {
      this.router.navigate(["/users-list"]);
      this.snackBar.open('User Deleted Successfully!', '', { duration: 3000 });
    });
  }

  onSearch() {
    let payload: any = {};
    this.username ? payload['username'] = this.username : '';
    this.email ? payload['email'] = this.email : '';
    this.fromDate ? payload['fromDate'] = moment(this.fromDate).format('YYYY/MM/DD') : '';
    this.toDate ? payload['toDate'] = moment(this.toDate).format('YYYY/MM/DD') : '';
    console.log(payload)
    this.userSvc.findByName(payload).then((dist) => {
      this.userList = dist.data;
      this.dataSource.data = this.userList;
      this.dataSource.paginator = this.paginator;
    })
  }
userDetail(data:any){
  this.dialog.open(ListModalComponent, {
    width: '40%',
    data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          dob: new Date(data.dob).toLocaleString(),
          createdAt: new Date(data.createdAt).toLocaleString(),
          updatedAt:new Date(data.updatedAt).toLocaleString()
    }
  });
}
  onClickUserCreate() {
    this.router.navigate(['/user']);
  }

}
