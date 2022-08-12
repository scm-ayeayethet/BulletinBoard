import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUpdateConfirmRoutingModule } from './create-update-confirm-routing.module';
import { CreateUpdateConfirmComponent } from './create-update-confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';


@NgModule({
  declarations: [CreateUpdateConfirmComponent],
  imports: [
    CommonModule,
    CreateUpdateConfirmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class CreateUpdateConfirmModule { }
