import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsListRoutingModule } from './posts-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { PostsListComponent } from './posts-list.component';
import { ListsModule } from 'src/app/components/lists/lists.module';
import { PostDeleteDialogModule } from 'src/app/components/post-delete-dialog/post-delete-dialog.module';
import { PostModalModule } from 'src/app/components/post-modal/post-modal.module';
import { CsvModule } from '@ctrl/ngx-csv';

@NgModule({
  declarations: [
    PostsListComponent,
  ],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularmaterialsModule,
    ListsModule,
    PostDeleteDialogModule,
    PostModalModule,
    CsvModule
  ]
})
export class PostsListModule { }
