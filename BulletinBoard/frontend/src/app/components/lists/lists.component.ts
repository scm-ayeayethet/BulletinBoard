import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { ListModalComponent } from '../list-modal/list-modal.component';
import { PostDeleteDialogComponent } from '../post-delete-dialog/post-delete-dialog.component';
import { PostModalComponent } from '../post-modal/post-modal.component';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  displayedPostColumns: string[] = [
    'title',
    'description',
    'created_user_id',
    'created_at',
    'action'
  ];

  displayedUserColumns: string[] = [
    'name',
    'email',
    'created_user_id',
    'phone',
    'dob',
    'address',
    'created_at',
    'updated_at',
    'action'
  ];
  public userInfo: any;
  public dataSubject: any;
  public dataSource: any;
  public allPost: any;

  constructor(
    private dialog: MatDialog,
    private postSvc: PostService,
    private userSvc: UserService,
    public router: Router
  ) {
    if (window.location.href.indexOf('/posts-list') !== -1) {
      this.dataSubject = this.postSvc.dataSubject;
    } else {
      this.dataSubject = this.userSvc.dataSubject;
    }
  }

  ngOnInit(): void {
    const userLoginData: any = localStorage.getItem('userLoginData') || "";
    const data = JSON.parse(userLoginData);
    this.userInfo = data._id;

    this.dataSubject.subscribe((response: any) => {
      this.dataSource = response;
    });
  }

  //post title details
  postDetail(data: any) {
    this.dialog.open(PostModalComponent, {
      width: '40%',
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        posted_user: data.created_user_id ? data.created_user_id["name"] : data.updated_user_id["name"],
        posted_date: data.createdAt ? data.createdAt : data.updatedAt,
      }
    });
  }

  //user details
  userDetail(data: any) {
    this.dialog.open(ListModalComponent, {
      width: '40%',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        dob: new Date(data.dob).toLocaleString(),
        createdAt: new Date(data.createdAt).toLocaleString(),
        updatedAt: new Date(data.updatedAt).toLocaleString()
      }
    });
  }

  //post-delete
  public deletePost(data: any) {
    const postId = data._id;
    let dialogRef = this.dialog.open(PostDeleteDialogComponent, {
      width: '40%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.postSvc.deletePost(postId).then((dist) => {
          this.router.navigate(['posts-list'])
            .then(() => {
              window.location.reload();
            });
        })
      }
    });
  }

  //delete user 
  deleteUser(data: any) {
    const userId = data._id;
    let dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '40%',
      data: data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.userSvc.deleteUser(userId).then((dist) => {
          this.router.navigate(['users-list'])
            .then(() => {
              window.location.reload();
            });
        })
      }
    });
  }
}
