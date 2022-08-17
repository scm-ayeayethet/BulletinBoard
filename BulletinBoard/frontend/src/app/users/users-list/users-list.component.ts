import { ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'created_user_id', 'phone', 'dob', 'address', 'created_at', 'updated_at', 'action'];
  public dataSource!: MatTableDataSource<any>;
  userList: any = [];
  infoList: any = [];
  eachUser: any;
  userInfo: any;
  username = "";
  email = "";
  fromDate = "";
  toDate = "";
  today = new Date();
  currentPage = 0;
  totalSize = 0;
  pageSize = 5;
  pageOptions = [5, 10, 15];

  public dataSubject: any = null;

  constructor(
    private router: Router,
    private userSvc: UserService
  ) {
    this.dataSubject = this.userSvc.dataSubject;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userSvc.getUsers(this.currentPage, this.pageSize).then((dist) => {
      this.userList = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.userList);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.userList.length;
    });
  }

  onSearch() {
    let payload: any = {};
    this.username ? payload['username'] = this.username : '';
    this.email ? payload['email'] = this.email : '';
    this.fromDate ? payload['fromDate'] = moment(this.fromDate).format('YYYY/MM/DD') : '';
    this.toDate ? payload['toDate'] = moment(this.toDate).format('YYYY/MM/DD') : '';
    this.userSvc.findByName(this.currentPage, this.pageSize, payload).then((dist) => {
      this.userList = dist.data;
      this.dataSource.data = this.userList;
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.userList.length;
    })
  }

  onClickUserCreate() {
    this.router.navigate(['/user']);
  }
}
