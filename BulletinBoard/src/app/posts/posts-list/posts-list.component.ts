import { ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { POSTS } from 'src/app/constants/constants';
import { USERS } from 'src/app/constants/constants';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  public postDetail: any = [];
  public allPost: any = [];
  public eachPost: any = [];
  public eachData: any = [];
  public userInfo: any = [];
  public postListDetail: any = [];
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
  }

  //post delete
  deletePost(postId: any) {
  }

  //post create
  createPost() {
  }

  //post upload
  uploadCSV() {
  }

  //post title details
  titleDetail(postId: any) {
  }
}
