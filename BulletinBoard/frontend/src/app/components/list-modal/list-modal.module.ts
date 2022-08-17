import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListModalRoutingModule } from './list-modal-routing.module';
import { ListModalComponent } from './list-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';


@NgModule({
  declarations: [ListModalComponent],
  imports: [
    CommonModule,
    ListModalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class ListModalModule { }
