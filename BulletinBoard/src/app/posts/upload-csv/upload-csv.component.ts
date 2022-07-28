import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlainmodalComponent } from 'src/app/components/plainmodal/plainmodal.component';
import { CSVRecord } from 'src/app/interfaces/CSVModels';
import { POSTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {

  public userInfo: any;
  public records: any;
  public postList: any = [];
  public duplicateTitle: any;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<UploadCsvComponent>) { }

  @ViewChild('csvReader') csvReader: any;

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
    this.getPostList();
  }

  getPostList() {
    // this.postSvc.geAllPost().subscribe({
    //   next: result => {
    //     this.postList = result;
    //   },
    //   error: err => {
    //     console.log('=== handle error ====')
    //     console.log(err)
    //   }
    // });
    const result = POSTS.map( res => {return res});
    this.postList =result;
  }

  uploadListener($event: any): void {

    let uploadData: any = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        //check duplicate title
        let csvTitle = this.records.map((rTitle: any) => { return rTitle.title });
        this.duplicateTitle = this.postList.filter((item: any) => csvTitle.includes(item.title));

        if (this.duplicateTitle.length > 0) {
          const csvTitle = this.duplicateTitle.map((item: any) => item.title)
          this.dialog.open(PlainmodalComponent, {
            data: {
              content: `${csvTitle} already exists in the post list!`,
              note: '',
              applyText: 'Ok'
            }
          })
        } else {
          this.records.map((result: any) => {
            let res = {
              title: result.title,
              description: result.description,
              status: 1,
              created_user_id: this.userInfo.id,
              updated_user_id: this.userInfo.id,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: "",
              is_removed: false
            }

            uploadData = res;
          })
          this.snackBar.open('Post Created Successfully!', '', { duration: 3000 });
        }
        this.dialogRef.close();
      };

      reader.onerror = function () {
        console.log('Error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord : CSVRecord = new CSVRecord();
        csvRecord.title = currentRecord[0];
        csvRecord.description = currentRecord[1];
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }
}