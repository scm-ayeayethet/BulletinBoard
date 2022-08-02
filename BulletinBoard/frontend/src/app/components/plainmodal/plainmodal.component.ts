import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plainmodal',
  templateUrl: './plainmodal.component.html',
  styleUrls: ['./plainmodal.component.scss']
})
export class PlainmodalComponent implements OnInit {

  content?: string;
  note?: string;
  applyText?: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlainmodalComponent,
    private dialogRef: MatDialogRef<PlainmodalComponent>
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

}
