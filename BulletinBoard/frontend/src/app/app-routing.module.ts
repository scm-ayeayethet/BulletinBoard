import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateUpdateConfirmComponent } from './posts/create-update-confirm/create-update-confirm.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { UploadCsvComponent } from './posts/upload-csv/upload-csv.component';
import { PostResolver } from './resolver/post.resolver';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
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
    path: 'forget-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'forget-password-update/:userId/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'posts-list',
    component: PostsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-post',
    component: CreateUpdateConfirmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-post/:id',
    component: CreateUpdateConfirmComponent,
    canActivate: [AuthGuard],
    resolve: { post: PostResolver }
  },
  {
    path: 'upload-post',
    component: UploadCsvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserCreateConfirmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: UserCreateConfirmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-pwd/:id',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
