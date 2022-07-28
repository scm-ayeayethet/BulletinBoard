import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { POSTS } from 'src/app/constants/constants';
import { USERS } from 'src/app/constants/constants';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { UploadCsvComponent } from '../upload-csv/upload-csv.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  public allPost: any = [];
  public eachData: any = [];
  public userInfo: any = [];
  public postId: any;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_at', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login();
  }

  login() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    if (this.userInfo.type === 0) {
      this.getPostData();
    } else {
      this.getEachPost();
    }
  }
  getPostData() {
    this.allPost = POSTS.filter(data => {
      const res = POSTS.map((subject: any) => {
        const ans = USERS.find(element => element.id == subject.created_user_id);
        return subject.user_name = ans?.name;
      })
      return data.is_removed == false && data.status === 1;
    });
    this.allPost.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1);
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.allPost);
      this.dataSource.paginator = this.paginator;
    });
  }

  getEachPost() {
    this.allPost = POSTS.filter(data => {
      const res = POSTS.map((subject: any) => {
        const ans = USERS.find(element => element.id == subject.created_user_id);
        return subject.user_name = ans?.name;
      })
      return data.created_user_id === this.userInfo.id && data.is_removed == false && data.status === 1;
    });
    this.allPost.sort((a: any, b: any) => a.order_key > b.order_key ? 1 : -1);
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.allPost);
      this.dataSource.paginator = this.paginator;
    });
  }

  //post search filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  //post edit
  editPost(postId: number) {
    this.router.navigate(['/post/' + postId])
  }

  //post delete
  deletePost(postId: any) {
    const deletedParam = POSTS.filter(res => res.id === postId);
    this.eachData = deletedParam;

    const param = this.eachData.map((result: any) => {
      return {
        "title": result.title,
        "description": result.description,
        "status": result.status,
        "created_user_id": result.created_user_id,
        "updated_user_id": result.updated_user_id,
        "created_at": result.created_at,
        "is_removed": true,
        "deleted_at": new Date()
      }
    })

    if (this.userInfo.type === 0) {
      this.snackBar.open('Admin Deleted Post Successfully!', '', { duration: 3000 });
      this.getPostData();
    }
    else {
      this.snackBar.open('Post Deleted Successfully!', '', { duration: 3000 });
      this.getEachPost();
    }
  }

  //post create
  createPost() {
    this.router.navigate(['/post']);
  }

  //post upload
  uploadCSV() {
    let dialogRef = this.dialog.open(UploadCsvComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.login();
    })
  }

  //post title details
  postDetail(postId: any) {

    const details = POSTS.find(res => res.id === postId);
    this.eachData = details;
    this.dialog.open(PostModalComponent, {
      width: '40%',
      data: {
        title: this.eachData.title,
        description: this.eachData.description,
        status: this.eachData.status,
        created_user_id: this.eachData.created_user_id,
        updated_user_id: this.eachData.updated_user_id,
        created_at: this.eachData.created_at,
      }
    });
  }
}
