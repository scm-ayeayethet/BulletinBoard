import { ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USERS } from 'src/app/constants/constants';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'created_user_id', 'phone', 'dob', 'address', 'created_at', 'updated_at', 'action'];
  dataSource!: MatTableDataSource<any>;
  userList: any = [];
  orgList: any = [];
  eachUser: any;
  userInfo: any;
  nameFilter: any;
  emailFilter: any;
  fromDate: any;
  toDate: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUserData();
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  }
  getUserData() {
    this.orgList = USERS.filter(data => {
      const res = USERS.map((subject: any) => {
        const ans = USERS.find(element => element.id == subject.created_user_id);
        return subject.user_name = ans?.name;
      })
      return data.is_removed == false;
    });
    this.userList = USERS.filter(data => {
      const res = USERS.map((subject: any) => {
        const ans = USERS.find(element => element.id == subject.created_user_id);
        return subject.user_name = ans?.name;
      })
      return data.is_removed == false;
    });
    this.orgList.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1);
    this.userList.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1);
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
    });
  }

  getEachUser(userId: any) {
    const details = USERS.find(res => res.id === userId);
    this.eachUser = details;
    this.dialog.open(ListModalComponent, {
      width: '40%',
      data: {
        name: this.eachUser.name,
        email: this.eachUser.email,
        phone: this.eachUser.phone,
        dob: this.eachUser.dob,
        address: this.eachUser.address,
        created_date: this.eachUser.created_at
      }
    });
  }

  updateUserData(userId: any) {
     this.router.navigate(['/edit-profile/' + userId]);
  }

  deleteUserData(userId: any) {
    const deletedParam = USERS.filter(res => res.id === userId);
    this.eachUser = deletedParam;

    const param = this.eachUser.map((result: any) => {
      return {
        "id": userId,
          "name": result.name,
          "email": result.email,
          "password": result.password,
          "type": result.type,
          "phone": result.phone,
          "address": result.address,
          "dob": result.dob,
          "created_user_id": result.created_user_id,
          "updated_user_id": result.updated_user_id,
          "deleted_user_id": this.userInfo.id,
          "created_at": result.created_at,
          "updated_at": result.updated_at,
          "deleted_at": new Date(),
          "is_removed": true
      }
    })
    console.log(param)

    if (this.userInfo.type === 0) {
      this.snackBar.open('User Deleted Successfully!', '', { duration: 3000 });
    }
    else {
      this.snackBar.open('User Deleted Successfully!', '', { duration: 3000 });
    }
  }

  onSearch() {
    if (!this.nameFilter && !this.emailFilter && !this.fromDate && !this.toDate) {
      this.getUserData();
    }
    if (this.nameFilter && !this.emailFilter && !this.fromDate && !this.toDate) {
      //for name filter
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter);
      });
      this.dataSource = new MatTableDataSource(result);
    } else if (!this.nameFilter && this.emailFilter && !this.fromDate && !this.toDate) {
      //for email filter
      let result = this.orgList.filter((e: any) => {
        return e.email.includes(this.emailFilter);
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else if (!this.nameFilter && !this.emailFilter && this.fromDate && this.toDate) {
      //for date filter
      this.toDate.setTime(this.toDate.getTime() + ((23 * 60 + 59) * 60 + 59) * 1000);
      let result = this.orgList.filter((e: any) => {
        return new Date(e.created_at) >= this.fromDate
          && new Date(e.created_at) <= this.toDate
      });
      this.dataSource = new MatTableDataSource(result);
    } else if (this.nameFilter && this.emailFilter && !this.fromDate && !this.toDate) {
      //for name and email filter
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter) && e.email.includes(this.emailFilter);
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else if (this.nameFilter && !this.emailFilter && this.fromDate && this.toDate) {
      //for name and date filter
      this.toDate.setTime(this.toDate.getTime() + ((23 * 60 + 59) * 60 + 59) * 1000);
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter)
          && new Date(e.created_at) >= this.fromDate
          && new Date(e.created_at) <= this.toDate
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else if (!this.nameFilter && this.emailFilter && this.fromDate && this.toDate) {
      //for email and date filter
      this.toDate.setTime(this.toDate.getTime() + ((23 * 60 + 59) * 60 + 59) * 1000);
      let result = this.orgList.filter((e: any) => {
        return e.email.includes(this.emailFilter)
          && new Date(e.created_at) >= this.fromDate
          && new Date(e.created_at) <= this.toDate
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else {
      //for name , email and date filter
      this.toDate.setTime(this.toDate.getTime() + ((23 * 60 + 59) * 60 + 59) * 1000);
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter)
          && e.email.includes(this.emailFilter)
          && new Date(e.created_at) >= this.fromDate
          && new Date(e.created_at) <= this.toDate
      });
      this.dataSource = new MatTableDataSource(result);
    }
    this.dataSource.paginator = this.paginator;
  }

  onClickUserCreate() {
    this.router.navigate(['/user']);
  }

}
