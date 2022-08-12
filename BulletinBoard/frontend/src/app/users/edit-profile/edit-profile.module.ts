import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';


@NgModule({
  declarations: [EditProfileComponent],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class EditProfileModule { }
