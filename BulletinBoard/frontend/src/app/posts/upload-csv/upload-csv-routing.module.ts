import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCsvComponent } from './upload-csv.component';
import { UploadCsvModule } from './upload-csv.module';

const routes: Routes = [{
  path: '',
  component: UploadCsvComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadCsvRoutingModule { }
