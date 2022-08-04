import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CSVRecord } from 'src/app/interfaces/CSVModels';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {

  public csvFile: any;
  public uploadData: any = [];
  public userInfo: any;
  public records: any;
  public uplaodPostErrMsg: string = "";
  public noFileErrMsg: string = "";
  public csvErrMsg: string = "";
  files: any;

  constructor(
    private postSvc: PostService,
    private router: Router) { }

  @ViewChild('csvReader') csvReader: any;

  ngOnInit(): void {
    const data: any = localStorage.getItem('userLoginData') || "";
    this.userInfo = JSON.parse(data)._id;
  }

  uploadCSV() {
    if (!this.csvFile || this.uploadData === undefined) {
      this.noFileErrMsg = "Please select a file";
      this.onClear();
    }
    console.log(this.uploadData)
    this.postSvc.createPost(this.uploadData).then((dist) => {
      this.router.navigate(["/posts-list"]);
    });
  }

  uploadListener(fileInput: any): void {
    this.files = fileInput.srcElement.files;
    if (this.isValidCSVFile(this.files[0])) {
      let input = fileInput.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        this.records.map((result: any) => {
          let res = {
            title: result.title,
            description: result.description,
            created_user_id: this.userInfo,
          }
          this.uploadData.push(res);
        })
      };
      reader.onerror = function () {
      };
    } else {
      this.uplaodPostErrMsg = "Please select a correct CSV file";
      this.onClear();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.title = currentRecord[0];
        csvRecord.description = currentRecord[1];
        if (!currentRecord[0] || !currentRecord[1]) {
          this.csvErrMsg = "Please select a formatted CSV file";
          this.onClear();
        } else {
          csvArr.push(csvRecord);
        }
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

  onClear() {
    this.csvReader.nativeElement.value = "";
    this.uploadData = undefined;
  }
}