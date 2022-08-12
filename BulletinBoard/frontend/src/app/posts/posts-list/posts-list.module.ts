import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsListRoutingModule } from './posts-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { PostsListComponent } from './posts-list.component';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';


@NgModule({
  declarations: [PostsListComponent,PostModalComponent],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularmaterialsModule,
  ]
})
export class PostsListModule { }
