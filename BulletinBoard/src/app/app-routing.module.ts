import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateConfirmComponent } from './posts/create-update-confirm/create-update-confirm.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostResolver } from './resolver/post.resolver';
import { LoginComponent } from './users/login/login.component';

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
    resolve: { post : PostResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
