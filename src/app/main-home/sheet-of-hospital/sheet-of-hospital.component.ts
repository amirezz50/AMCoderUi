import { Component, OnInit } from '@angular/core';
import { SheetOfHospitalService } from './sheet-of-hospital.service';

@Component({
  selector: 'sheet-of-hospital',
  templateUrl: './sheet-of-hospital.component.html',
  styleUrls: ['./sheet-of-hospital.component.css']
})
export class SheetOfHospitalComponent implements OnInit {
  arraylist: any[] = []
  tasksList: any[] = []
  pageIndex: number = 0;
  pageSize: number = 10;
  pageIndexTwo: number = 0;
  pageSizeTwo: number = 10;
  constructor(private _sheetOfHospitalService: SheetOfHospitalService) { }

  ngOnInit(): void {
    this.getSheets()
  }
  getSheets() {
    let pagination = { page: this.pageIndex, pageSize: this.pageSize }
    this._sheetOfHospitalService.getMedicalSheets(pagination)
      .subscribe((res: any) => {
        this.arraylist = res.items;
      })
  }
  sheetMaster: any = {}
  getTasks(row: any, num: number) {
    let obj = { sheetId: row.sheetId, page: this.pageIndexTwo, pageSize: this.pageSizeTwo }

    this._sheetOfHospitalService.getMedicalTask(obj)
      .subscribe((res: any) => {
        this.sheetMaster = res
        this.tasksList = res.medicalTasks.items;
        if (num == 1) {
          this.autoMatch(obj)
        }
      })

  }
  autoMatch(obj: any) {
    this._sheetOfHospitalService.autoMatchTasks(obj)
      .subscribe((res: any) => {
        window.alert("Done AutoMatching for Sheet Number " + obj.sheetId);
      })

  }
}
