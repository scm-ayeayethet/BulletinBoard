import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PostResolver } from './resolver/post.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'posts-list', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./users/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./users/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'forget-password-update/:userId/:token',
    loadChildren: () => import('./users/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'posts-list',
    loadChildren: () => import('./posts/posts-list/posts-list.module').then(m => m.PostsListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-post',
    loadChildren: () => import('./posts/create-update-confirm/create-update-confirm.module').then(m => m.CreateUpdateConfirmModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-post/:id',
    loadChildren: () => import('./posts/create-update-confirm/create-update-confirm.module').then(m => m.CreateUpdateConfirmModule),
    canActivate: [AuthGuard],
    resolve: { post: PostResolver }
  },
  {
    path: 'upload-post',
    loadChildren: () => import('./posts/upload-csv/upload-csv.module').then(m => m.UploadCsvModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users-list',
    loadChildren: () => import('./users/users-list/users-list.module').then(m => m.UsersListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./users/user-create-confirm/user-create-confirm.module').then(m => m.UserCreateConfirmModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile/:id',
    loadChildren: () => import('./users/user-profile/user-profile.module').then(m => m.UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile/:id',
    loadChildren: () => import('./users/edit-profile/edit-profile.module').then(m => m.EditProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-pwd/:id',
    loadChildren: () => import('./users/change-password/change-password.module').then(m => m.ChangePasswordModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-account',
    loadChildren: () => import('./users/create-account/create-account.module').then(m => m.CreateAccountModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
