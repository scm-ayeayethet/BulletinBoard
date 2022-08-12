import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateConfirmComponent } from './user-create-confirm.component';

const routes: Routes = [{
  path: '',
  component: UserCreateConfirmComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreateConfirmRoutingModule { }
