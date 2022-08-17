import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDeleteDialogRoutingModule } from './post-delete-dialog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { PostDeleteDialogComponent } from './post-delete-dialog.component';


@NgModule({
  declarations: [PostDeleteDialogComponent],
  imports: [
    CommonModule,
    PostDeleteDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class PostDeleteDialogModule { }
