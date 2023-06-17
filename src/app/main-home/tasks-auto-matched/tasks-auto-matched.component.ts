import { Component, OnInit } from '@angular/core';
import { TasksAutoMatchedService } from './tasks-auto-matched.service';
import { SheetOfHospitalService } from '../sheet-of-hospital/sheet-of-hospital.service';

@Component({
  selector: 'tasks-auto-matched',
  templateUrl: './tasks-auto-matched.component.html',
  styleUrls: ['./tasks-auto-matched.component.css']
})
export class TasksAutoMatchedComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 10;
  pageIndexTwo: number = 0;
  pageSizeTwo: number = 10;
  constructor(private _sheetOfHospitalService: SheetOfHospitalService) { }
  arrayTasksList: any[] = []
  arraySheetlist: any[] = []

  ngOnInit(): void {
    this.getSheets();
  }
  getSheets() {
    let pagination = { page: this.pageIndex, pageSize: this.pageSize }
    this._sheetOfHospitalService.getMedicalSheets(pagination)
      .subscribe((res: any) => {
        this.arraySheetlist = res.items;
      })
  }
  getTasksMatched(row: any) {
    let obj = { sheetId: row.sheetId, page: this.pageIndex, pageSize: this.pageSize }
    this._sheetOfHospitalService.getMedicalTask(obj)
      .subscribe(res => {
        this.arrayTasksList = res.medicalTasks.items
      })
  }

}
