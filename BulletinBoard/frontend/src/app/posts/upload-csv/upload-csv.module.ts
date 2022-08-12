import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCsvRoutingModule } from './upload-csv-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularmaterialsModule } from 'src/app/angularmaterials.module';
import { UploadCsvComponent } from './upload-csv.component';


@NgModule({
  declarations: [UploadCsvComponent],
  imports: [
    CommonModule,
    UploadCsvRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularmaterialsModule
  ]
})
export class UploadCsvModule { }
