import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CreateUpdateConfirmModule } from './posts/create-update-confirm/create-update-confirm.module';
import { UploadCsvModule } from './posts/upload-csv/upload-csv.module';
import { PostResolver } from './resolver/post.resolver';
import { ChangePasswordModule } from './users/change-password/change-password.module';
import { CreateAccountModule } from './users/create-account/create-account.module';
import { EditProfileModule } from './users/edit-profile/edit-profile.module';
import { UserCreateConfirmModule } from './users/user-create-confirm/user-create-confirm.module';
import { UserProfileModule } from './users/user-profile/user-profile.module';
import { UsersListModule } from './users/users-list/users-list.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./users/login/login.module').then(m => m.LoginModule)
  },
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
    loadChildren: () => import('./posts/create-update-confirm/create-update-confirm.module').then(m => CreateUpdateConfirmModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-post/:id',
    loadChildren: () => import('./posts/create-update-confirm/create-update-confirm.module').then(m => CreateUpdateConfirmModule),
    canActivate: [AuthGuard],
    resolve: { post: PostResolver }
  },
  {
    path: 'upload-post',
    loadChildren: () => import('./posts/upload-csv/upload-csv.module').then(m => UploadCsvModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users-list',
    loadChildren: () => import('./users/users-list/users-list.module').then(m => UsersListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./users/user-create-confirm/user-create-confirm.module').then(m => UserCreateConfirmModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile/:id',
    loadChildren: () => import('./users/user-profile/user-profile.module').then(m => UserProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile/:id',
    loadChildren: () => import('./users/edit-profile/edit-profile.module').then(m => EditProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-pwd/:id',
    loadChildren: () => import('./users/change-password/change-password.module').then(m => ChangePasswordModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-account',
    loadChildren: () => import('./users/create-account/create-account.module').then(m => CreateAccountModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
