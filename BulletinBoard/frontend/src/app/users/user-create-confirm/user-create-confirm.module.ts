import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreateConfirmRoutingModule } from './user-create-confirm-routing.module';
import { UserCreateConfirmComponent } from './user-create-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';


@NgModule({
  declarations: [UserCreateConfirmComponent],
  imports: [
    CommonModule,
    UserCreateConfirmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class UserCreateConfirmModule { }
