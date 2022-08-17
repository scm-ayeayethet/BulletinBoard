import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostModalRoutingModule } from './post-modal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { PostModalComponent } from './post-modal.component';


@NgModule({
  declarations: [PostModalComponent],
  imports: [
    CommonModule,
    PostModalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class PostModalModule { }
