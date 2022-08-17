import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateConfirmComponent } from './create-update-confirm.component';

const routes: Routes = [{
  path: '',
  component: CreateUpdateConfirmComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateUpdateConfirmRoutingModule { }
