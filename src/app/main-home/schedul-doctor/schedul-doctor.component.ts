import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SchedulDoctorService, ScheduleDay, ScheduleMaster, ScheduleTime, Scheduling, SchedulingVm, scheduleMode, weekDays, weekDaysEn, Shift } from './schedul-doctor.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'schedul-doctor',
  templateUrl: './schedul-doctor.component.html',
  styleUrls: ['./schedul-doctor.component.css']
})
export class SchedulDoctorComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  scheduleDays: any[] = [
    { serial: 1, name: "Saturday", shifts: [], isSelected: 0 },
    { serial: 2, name: "Sunday", shifts: [], isSelected: 0 },
    { serial: 3, name: "Monday", shifts: [], isSelected: 0 },
    { serial: 4, name: "Tuesday", shifts: [], isSelected: 0 },
    { serial: 5, name: "Wednesday", shifts: [], isSelected: 0 },
    { serial: 6, name: "Thursday", shifts: [], isSelected: 0 },
    { serial: 7, name: "Friday", shifts: [], isSelected: 0 },
  ];
  constructor(public _toaster: ToastrService, private _SchedulDoctorService: SchedulDoctorService) { }
  ngOnInit(): void {
    this.getListShifts();
  }
  getListShifts() {
    this.resetScheduleDays()
    this._SchedulDoctorService.getScheduleShifts({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            this.mappingScheduleDays(res.data);
          } else if (Object.keys(res).length != 0) {
            this._toaster.error(res);
          }
        })
  }
  mappingScheduleDays(data: any) {
    data.forEach((row: any) => {
      if (row.serial > 0) {
        const dayIndex = this.scheduleDays.findIndex((day: any) => day.serial === row.dayNo);
        if (dayIndex !== -1) {
          this.scheduleDays[dayIndex].isSelected = 1;
          this.scheduleDays[dayIndex].shifts.push(this.mapSqlResultToShifts(row));
        }
      }
    });
  }
  mapSqlResultToShifts(row: any) {
    return {
      serial: row.serial,
      startTime: row.startTime.split("T")[1].substring(0, 5),
      endTime: row.endTime.split("T")[1].substring(0, 5),
      numSlot: row.numSlot,
      flagShiftOnOff: row.flagShiftOnOff,
    };
  }
  addNewShift(row: any) {
    row.isSelected = 1
    row.shifts.push({ serial: (row.shifts.length + 1) * -1, startTime: "", endTime: "", numSlot: 0, flagShiftOnOff: true, dataStatus: 1 });
  }
  removeShit(arrShits: any, shift: any) {
    if (shift.serial <= 0) {
      arrShits.splice(arrShits.indexOf(shift), 1);
      this._toaster.success("Removed Done")

    } else {
      this._SchedulDoctorService.deleteScheduleShifts(shift)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res: any) => {
            if ((res && res.data) || (Object.keys(res).length == 0)) {
              this._toaster.success("Removed Done");
              this.getListShifts();
            } else if (Object.keys(res).length != 0) {
              this._toaster.error(res);
            }

          })
    }
  }
  toggleOnOff(shift: any) {
    shift.flagShiftOnOff = !shift.flagShiftOnOff;
  }
  checkTimeGreaterThan(shift: any) {
    if (shift.startTime > shift.endTime && shift.endTime != "") {
      shift.endTime = "";
      this._toaster.error("start time is greater than end time")
    }
  }
  save() {
    let scheduleData = this.collectScheduleData()
    this._SchedulDoctorService.saveScheduleShifts(scheduleData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            this._toaster.success("Done");
            this.getListShifts();
          } else if (Object.keys(res).length != 0) {
            this._toaster.error(res);
          }
        })
  }
  collectScheduleData(): any {
    let arr = this.scheduleDays.map((day) => {
      return {
        serial: day.serial,
        dayNo: day.serial,
        weekDay: day.name,
        beginDate: this.getFormateTime(null),
        expiryDate: this.getFormateTime(null),
        shifts: day.shifts.map((shift: any) => ({
          serial: shift.serial,
          startTime: this.getFormateTime(shift.startTime),
          endTime: this.getFormateTime(shift.endTime),
          numSlot: shift.numSlot,
          flagShiftOnOff: shift.flagShiftOnOff ? 1 : 0,
          dataStatus: shift.dataStatus,
          schedDaySerial: day.serial
        })),
        isSelected: day.isSelected,
      };
    })
    return arr;
  }
  getFormateTime(time: any): any {
    let today = new Date();
    if (time) {
      return new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(time.split(':')[0]) + 2, parseInt(time.split(':')[1])).toISOString();
    } else {
      return today.toISOString();
    }
  }
  resetScheduleDays() {
    this.scheduleDays = [
      { serial: 1, name: "Saturday", shifts: [], isSelected: 0 },
      { serial: 2, name: "Sunday", shifts: [], isSelected: 0 },
      { serial: 3, name: "Monday", shifts: [], isSelected: 0 },
      { serial: 4, name: "Tuesday", shifts: [], isSelected: 0 },
      { serial: 5, name: "Wednesday", shifts: [], isSelected: 0 },
      { serial: 6, name: "Thursday", shifts: [], isSelected: 0 },
      { serial: 7, name: "Friday", shifts: [], isSelected: 0 },
    ];
  }
}
import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'filterDoctor'
})
export class FilterDoctorPipe implements PipeTransform {
  transform(doctors: any[], searchTerm: string): any[] {
    if (!doctors || !searchTerm) {
      return doctors;
    }
    searchTerm = searchTerm.toLowerCase();
    return doctors.filter(doctor => doctor.FullName.toLowerCase().includes(searchTerm));
  }
}
export interface Config {
  id: string,
  parentId: string,
}
export function unflatten(arr: any[], config: Config = { id: 'id', parentId: 'parentId' }) {
  var tree = [],
    mappedArr: any = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem[config.id]] = arrElem;
    mappedArr[arrElem[config.id]]['children'] = [];
  }
  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      if (mappedElem[config.parentId] && mappedArr[mappedElem[config.id]] && mappedArr[mappedElem[config.parentId]]) {
        mappedArr[mappedElem[config.parentId]]['children'].push(mappedElem);
      }
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}
