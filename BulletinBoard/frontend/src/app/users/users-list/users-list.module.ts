import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { ListsModule } from 'src/app/components/lists/lists.module';
import { ListModalModule } from 'src/app/components/list-modal/list-modal.module';
import { UserDeleteDialogModule } from 'src/app/components/user-delete-dialog/user-delete-dialog.module';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule,
    ListsModule,
    ListModalModule,
    UserDeleteDialogModule
  ]
})
export class UsersListModule { }
