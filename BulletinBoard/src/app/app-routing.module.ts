import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateConfirmComponent } from './posts/create-update-confirm/create-update-confirm.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostResolver } from './resolver/post.resolver';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { LoginComponent } from './users/login/login.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { UserCreateConfirmComponent } from './users/user-create-confirm/user-create-confirm.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UsersListComponent } from './users/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgotPwd',
    component: ForgotPasswordComponent
  },
  {
    path : 'resetPwd',
    component: ResetPasswordComponent
  },
  {
    path: 'posts-list',
    component: PostsListComponent
  },
  {
    path: 'post',
    component: CreateUpdateConfirmComponent
  },
  {
    path: 'post/:id',
    component: CreateUpdateConfirmComponent ,
    resolve: { post: PostResolver }
  },
  {
    path: 'users-list',
    component: UsersListComponent
  },
  {
    path: 'user',
    component: UserCreateConfirmComponent 
  },
  {
    path: 'user/:id',
    component: UserCreateConfirmComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
