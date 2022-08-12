import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class ResetPasswordModule { }
