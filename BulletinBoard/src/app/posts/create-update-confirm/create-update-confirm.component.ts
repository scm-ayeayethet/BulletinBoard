import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { POSTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-create-update-confirm',
  templateUrl: './create-update-confirm.component.html',
  styleUrls: ['./create-update-confirm.component.scss']
})
export class CreateUpdateConfirmComponent implements OnInit {

  confirmView: Boolean = false;
  pageTitle: string = 'Create Post';
  buttonName: string = 'Create';
  public postForm!: FormGroup;
  public postId: any;
  public isChecked: boolean = true;
  public status: any;
  public postDetail: any;
  public existingPost: any;
  public isEditPost: boolean = true;
  public postData: any;
  public userInfo: any;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

    this.postId = this.activatedRoute.snapshot.params['id'];

    if (this.router.url.indexOf('/post') !== -1 && this.postId !== undefined) {
      this.pageTitle = 'Update Post';
      this.buttonName = 'Update';

      this.existingPost = POSTS.filter(res => { return res.id == this.postId; });

      if (this.existingPost) {
        this.isEditPost = true;
        if (this.existingPost.status === 1) {
          this.isChecked = true;
        } else {
          this.isChecked = false;
        }
        this.status = this.existingPost.status;
        this.postForm.controls['title'].setValue("update");
        this.postForm.controls['description'].setValue("update description");
      }
    }

  }

  // getPostData() {
  //   const data = POSTS.map(res => { return res });
  //   this.postDetail = data;
  //    if (this.postDetail) {
  //     if (this.postDetail.status === 1) {
  //       this.isChecked = true;
  //     } else {
  //       this.isChecked = false;
  //     }
  //     this.status = this.postDetail.status;
  //     this.postForm.setValue({
  //       title: this.postDetail.title ?? null,
  //       description: this.postDetail.description ?? null
  //     });
  //   }
  // }

  public myError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
  }

  changeToggle($event: MatSlideToggleChange) {
    if ($event.checked) {
      this.status = 1;
    } else {
      this.status = 0;
    }
  }

  clearData() {
    if (this.confirmView == true) {
      this.postForm.controls['title'].enable();
      this.postForm.controls['description'].enable();
      this.postForm.controls['status'].enable();
      this.confirmView = false;
    } else {
      this.postForm.reset();
    }
  }

  confirmPost() {
    if (this.confirmView == true && this.buttonName == 'Create') {
      const data: any = localStorage.getItem('userInfo') || "";
      this.postData = JSON.parse(data);
      const payload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        created_user_id: this.postData.id
      }
      this.router.navigate(["posts-list"]);
    }

    else if (this.confirmView == true && this.buttonName == 'Update') {
      const data: any = localStorage.getItem('userInfo') || "";
      this.postData = JSON.parse(data);
      const payload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        updated_user_id: this.postData.id
      }
      this.router.navigate(["posts-list"]);
    }

    if (this.postForm.valid) {
      this.postForm.controls['title'].disable();
      this.postForm.controls['description'].disable();
      this.postForm.controls['status'].disable();
      this.confirmView = true;
    }
  }
}


