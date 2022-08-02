import { ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { UploadCsvComponent } from '../upload-csv/upload-csv.component';
import { PostService } from 'src/app/services/post.service';
import { POSTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  keyword = "";
  postArr: any = [];
  postData: any = [];
  postLists: any;
  public allPost: any = [];
  public eachData: any = [];
  public userInfo: any = [];
  public postId: any;
  public dataSubject: any = null;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_at', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private postSvc: PostService
  ) {
    this.dataSubject = this.postSvc.dataSubject;
  }

  ngOnInit(): void {
    const userLoginData = JSON.parse(localStorage.getItem("userLoginData") || "");
    this.userInfo = userLoginData._id;
    this.getPosts();
  }

  getPosts() {
    this.postSvc.getPosts().then(dist => {
      this.allPost = dist.data;
      this.allPost.map((result: any) => {
        const res = {
          Title: result.title,
          Description: result.description,
          Posted_User: result.created_user_id ? result.created_user_id : result.updated_user_id,
          Posted_Date: new Date(result.createdAt).toLocaleString()
        };
        this.postArr.push(res);
      })
      this.postData = this.postArr;
      this.dataSource = new MatTableDataSource(this.allPost);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
    })
  }

  public searchUser() {
    const payload = {
      title: this.keyword,
    }
    this.postSvc.findByName(payload).then((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
    })
  }

  //post edit
  editPost(postId: number) {
    this.router.navigate(['/post/' + postId])
  }

  //post-delete
  public deletePost(data: any) {
    const postId = data._id;
    this.postSvc.deletePost(postId).then((dist) => {
      this.router.navigate(["/posts-list"]);
      this.snackBar.open('Post Deleted Successfully!', '', { duration: 3000 });
    });
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
      // this.login();
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
