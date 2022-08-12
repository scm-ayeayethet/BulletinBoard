import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';


@NgModule({
  declarations: [UsersListComponent,ListModalComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class UsersListModule { }
