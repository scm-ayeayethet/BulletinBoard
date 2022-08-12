import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class ForgotPasswordModule { }
