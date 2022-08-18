import { ViewChild, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  keyword = "";
  postArr: any = [];
  postLists: any;
  currentPage = 0;
  totalSize = 0;
  pageSize = 5;
  pageOptions = [5, 10, 15];
  public allPost: any = [];
  public eachData: any = [];
  public userInfo: any = [];
  public postData: any = [];
  public postId: any;
  public dataSubject: any = null;
  @Input() exporter: any;

  public dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_at', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private postSvc: PostService
  ) {
    this.dataSubject = this.postSvc.dataSubject;
  }

  ngOnInit(): void {
    const userLoginData = JSON.parse(localStorage.getItem("userLoginData") || "");
    this.userInfo = userLoginData._id;
    this.getPosts();

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('msg') === "delete success") {
        this.getPosts();
      }
    })
  }

  public getPosts() {
    this.postSvc.getPosts(this.currentPage, this.pageSize).then(dist => {
      this.allPost = dist.data;
      this.allPost.map((result: any) => {
        let res = {
          Title: result.title,
          Description: result.description,
          Posted_User: result.created_user_id ? result.created_user_id["name"] : result.updated_user_id["name"],
          Posted_Date: new Date(result.createdAt).toLocaleString()
        }
        this.postArr.push(res);
      })
      this.postData = this.postArr;
      this.dataSource = new MatTableDataSource(this.allPost);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.allPost.length;
    })
  }

  public searchUser() {
    const payload = {
      title: this.keyword,
    }
    this.postSvc.findByName(this.currentPage, this.pageSize, payload).then((dist) => {
      this.postLists = dist.data;
      this.dataSource = new MatTableDataSource<any>(this.postLists);
      this.dataSubject.next(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.totalSize = this.postLists.length;
    })
  }

  //post upload
  uploadCSV() {
    this.router.navigate(['/upload-post']);
  }

}
