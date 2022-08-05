import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/services/post.service';

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
  public postDetail: any;
  public existingPost: any;
  public postData: any;
  public userInfo: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private postSvc: PostService,
    private snackBar: MatSnackBar) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl(true)
    });
  }

  ngOnInit(): void {

    this.postId = this.activatedRoute.snapshot.params["id"];

    if (this.router.url.indexOf('/edit-post') !== -1 && this.postId !== undefined) {
      this.pageTitle = 'Update Post';
      this.buttonName = 'Update';

      this.existingPost = this.activatedRoute.snapshot.data['post'];

      if (this.existingPost) {
        this.postForm.controls['title'].setValue(this.existingPost.data.title);
        this.postForm.controls['description'].setValue(this.existingPost.data.description);
        this.postForm.controls['status'].setValue(this.existingPost.data.status);
      }
    }
  }

  public myError = (controlName: string, errorName: string) => {
    return this.postForm.controls[controlName].hasError(errorName);
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
      const data: any = localStorage.getItem('userLoginData') || "";
      this.userInfo = JSON.parse(data)._id;
      const payload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        created_user_id: this.userInfo
      }
      this.postSvc.createPost(payload).then(dist => {
        this.router.navigate(["posts-list"]);
        this.snackBar.open('Create post successfully!', '', { duration: 3000 });
      })
    }
    else if (this.confirmView == true && this.buttonName == 'Update') {
      const data: any = localStorage.getItem('userLoginData') || "";
      this.userInfo = JSON.parse(data)._id;

      const id: string = this.activatedRoute.snapshot.params['id'];
      const payload = {
        title: this.postForm.controls['title'].value,
        description: this.postForm.controls['description'].value,
        status: this.postForm.controls['status'].value,
        updated_user_id: this.userInfo
      }
      this.postSvc.updatePost(payload, id).then(dist => {
        this.router.navigate(["posts-list"]);
        this.snackBar.open('Update post successfully!', '', { duration: 3000 });
      })
    }

    if (this.postForm.valid) {
      this.postForm.controls['title'].disable();
      this.postForm.controls['description'].disable();
      this.postForm.controls['status'].disable();
      this.confirmView = true;
    }
  }
}


