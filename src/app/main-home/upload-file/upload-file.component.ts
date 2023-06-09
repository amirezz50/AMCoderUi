import { Component, EventEmitter, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 10;
  constructor(private _uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }
  nameSheetUpload: string = "Choose File";
  arrayBuffer: any;
  arraylist: any[] = []
  file: any;
  flagReadyToUpload: boolean = false
  addfile(event: any) {
    let nameFile: any;
    this.arraylist = []
    this.file = event.target.files[0];
    nameFile = this.file;
    this.nameSheetUpload = nameFile ? nameFile.name : "Choose File";
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = xlsx.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      console.log(xlsx.utils.sheet_to_json(worksheet, { raw: true }));
      this.arraylist = xlsx.utils.sheet_to_json(worksheet, { raw: true });
      if (this.arraylist.length > 0) {
        this.flagReadyToUpload = true
      } else {
        this.flagReadyToUpload = false
      }
      this.arraylist.forEach((element: any) => {
        if (element['Department'] && typeof element['Department'] == "string") {
          element['Department'] = element['Department'].replace('<', '&lt;');
          element['Department'] = element['Department'].replace('>', '&gt;')
        }
      });
    }
  }
  upload() {
    let obj = {
      "MedicalTasks": this.arraylist,
    }
    this._uploadFileService.uploadSheet(obj)
      .subscribe((res: any) => {
        console.log(res)
      })

  }
}
