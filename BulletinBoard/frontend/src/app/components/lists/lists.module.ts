import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { ListsComponent } from './lists.component';


@NgModule({
  declarations: [ListsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularmaterialsModule,
  ],
  exports: [ListsComponent]
})
export class ListsModule { }
