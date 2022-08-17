import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDeleteDialogRoutingModule } from './user-delete-dialog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { UserDeleteDialogComponent } from './user-delete-dialog.component';


@NgModule({
  declarations: [UserDeleteDialogComponent],
  imports: [
    CommonModule,
    UserDeleteDialogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class UserDeleteDialogModule { }
