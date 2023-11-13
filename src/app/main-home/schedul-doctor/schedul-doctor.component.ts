import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SchedulDoctorService, ScheduleDay, ScheduleMaster, ScheduleTime, Scheduling, SchedulingVm, scheduleMode, weekDays, weekDaysEn } from './schedul-doctor.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'schedul-doctor',
  templateUrl: './schedul-doctor.component.html',
  styleUrls: ['./schedul-doctor.component.css']
})
export class SchedulDoctorComponent implements OnInit {
  numOfSlot: number = 0;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  laserDoctorsObj: any = {}
  private resourceTypeParam!: number;
  private resourceIdParam!: number;
  private specialityIdParam!: number;
  private clinicCodeParam!: number;
  private entityType!: number;
  @ViewChild("delete", { static: true })
  delete!: TemplateRef<any>;
  @Input() get ResourceTypeParam() {
    return this.resourceTypeParam
  }
  set ResourceTypeParam(value) {
    this.resourceTypeParam = value
  }
  private schedException: boolean = false;
  schedulingVm: SchedulingVm = <SchedulingVm>{};
  resourceData: any = {}
  ResourceIdParam!: number | undefined
  SerialMaster!: any | undefined
  scheduleMode: scheduleMode = 1;
  branchIdParm!: number;

  scheduleMasterForm!: FormGroup;
  schedules: ScheduleMaster[] = [];
  clinicCode!: number;
  mergedData: any[] = []
  sort: boolean = false;
  constructor(private _toastService: ToastrService,
    private _router: Router,
    // private _userSessionService: UserSessionService,
    public translate: TranslateService,
    private _LaserDoctorsService: SchedulDoctorService,
    public _toaster: ToastrService,
    // public dialog: MatDialog,
    // private _LaserDoctorsScheduleService: LaserDoctorsScheduleService,
    private _fb: FormBuilder) { }
  ngOnInit() {
    this.getDoctors();

    this.initlizeControls();
    // this.getSchedules(null);

  }
  getCodeFromArray(ev: any) {
    this.docId = ev;
  }
  scheduleDays: any[] = [];

  getDaybyDocId() {
    if (!this.docId) {
      this._toaster.error("Please Select Doctor");
      return;
    }
    this._LaserDoctorsService.getScheduleByDocId({ docId: this.docId })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.array) {
            this.scheduleDays = []
            this.scheduleDays = res.array.data
          }
        }
      )

  }
  doctorArr: any[] = [];
  getDoctors() {
    this._LaserDoctorsService.getAllDoctors({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.array) {
            this.doctorArr = []
            this.doctorArr = res.array.data
          }
        }
      )
  }
  onBtnsClicked(event: any) {
    switch (event) {
      case 1: //save code
        this.save();
        break;
    }
  }

  initlizeControls() {
    let shift1DefaultStart = { hour: 8, minute: 30 };
    let shift1DefaultEnd = { hour: 16, minute: 30 };
    let date = new Date();
    this.scheduleMasterForm = this._fb!.group({
      timeSlot: 15,
      weekNo: 1,
      scheduleType: 2,
      scheduleStart: date,
      scheduleEnd: null,
      exceptionalFlag: null,
      overBookingLimit: [''],
      maxReservationCount: 0,
      startTime: shift1DefaultStart,
      endTime: shift1DefaultEnd,
      scheduleDays: this._fb.array([]),
      shifts: this._fb.array([]),
      reservForFutureReservation: [''],
      limitedDays: [''],
      placeCode: [''],

    })
    this.createScheduleDays();
  }
  get getShifts(): FormArray {
    return <FormArray>(this.scheduleMasterForm!.controls['shifts']);
  }
  createScheduleDays(): FormArray {
    let c = <FormArray>this.scheduleMasterForm!.get('scheduleDays');
    for (let i: number = 1; i < 8; i++) {
      c.push(this.addScheduleDay(i));
    }
    return c;
  }
  addScheduleDay(i: number) {
    let temp = this.buildscheduleDays(i);
    temp.patchValue({
      text: weekDays[i],
      textEn: weekDaysEn[i],
      dayNo: i,
      weekNo: 1,
      expiryDate: null
    });
    return temp;

  }

  buildscheduleDays(i: any): FormGroup {
    return this._fb.group({
      serial: i * -1,
      text: '',
      textEn: '',
      id: 0,
      dayNo: 0,
      isSelected: false,
      expiryDate: null

    })
  }
  clearTimes() {
    this.scheduleMasterForm!.controls['scheduleDays'].value.forEach((element: any) => {
      element["startTime"] = "";
      element["endTime"] = "";
      element["isSelected"] = false;
    });
  }
  docId: any

  // getSchedules(ev: any) {
  //   if (ev) {
  //     this.clearTimes();
  //     this.resourceTypeParam = 100;
  //     this.specialityIdParam = 14;
  //     this.laserDoctorsObj.docId = this.docId
  //     this.laserDoctorsObj.doctorId = this.docId
  //     this.resourceData.docId = this.laserDoctorsObj.docId;
  //     this.resourceIdParam = this.laserDoctorsObj.docId
  //     this.resourceData.entityType = 1;
  //     this.resourceData.specialityId = 14;
  //     this.resourceData.resourceType = 100;
  //     this.resourceData.bzranchIdParm = 1;
  //     this._LaserDoctorsService
  //       .getResourceSchedulingList(this.resourceData).pipe(
  //         takeUntil(this.ngUnsubscribe))
  //       .subscribe((res: any) => {
  //         var schedules = res.array[0];
  //         var template: any = [];
  //         template = template.concat(schedules.data);
  //         template = template.concat(schedules.data1);
  //         this.schedules = unflatten(template)
  //         if (this.schedules && this.schedules.length == 0 && schedules.data.length > 0) {
  //           // this.onHistoryMasterclicked(schedules.data[0]['id']);
  //           this.schedules = schedules.data;
  //           this.SerialMaster = this.schedules[0]['id']
  //         }
  //         else if (this.schedules && this.schedules.length > 0) {

  //           this.mergeDataArrays(schedules.data1, schedules.data2);
  //           this.SerialMaster = this.schedules[0]['id']
  //           // this.onHistoryMasterclicked(this.schedules[0]['id']);
  //         }
  //         //  else {
  //         //   this.onHistoryMasterclicked(0);
  //         // }


  //       }, (err: any) => console.log(err), () => { });
  //   } else {
  //     this.clearTimes();
  //     this.laserDoctorsObj.docId = null;
  //   }
  // }

  // onHistoryMasterclicked(masterSerial: number) {
  //   if (masterSerial == 0) {
  //     this._router.navigate(['/schedules/MainScheduling', this.resourceIdParam, 'new'], { queryParams: { 't': this.resourceTypeParam, 'BranchIdParm': this.branchIdParm, 'specialityId': this.specialityIdParam, 'clinicCode': this.clinicCode, 'entityType': this.entityType, 'time': Date.now() } });

  //   } else {
  //     this._router.navigate(['/schedules/MainScheduling', this.resourceIdParam, masterSerial], { queryParams: { 't': this.resourceTypeParam, 'specialityId': this.specialityIdParam, 'BranchIdParm': this.branchIdParm, 'clinicCode': this.clinicCode, 'entityType': this.entityType, 'time': Date.now() } });
  //   }

  // }

  save() {
    if (!this.laserDoctorsObj.docId) {
      this._toastService.error("Please Select Doctor.")
      return;
    }
    // this.checkDays();
    let scheduleMaster = <ScheduleMaster>{};
    scheduleMaster.branchId = 1;
    if (isNaN(this.SerialMaster) || this.SerialMaster == null || undefined) {
      scheduleMaster.serial = -1;
    } else {
      scheduleMaster.serial = this.SerialMaster;
    }
    //*******************************************************daily *******************************************************************
    if (this.scheduleMode == 1) {
      let days: any = [];
      for (let i = 0; i < this.scheduleMasterForm!.controls['scheduleDays'].value.length; i++) {
        if (this.scheduleMasterForm!.controls['scheduleDays'].value[i].isSelected == true
          || this.scheduleMasterForm!.controls['scheduleDays'].value[i].serial > 1) {
          days.push(this.scheduleMasterForm!.controls['scheduleDays'].value[i]);
        }
      }
      scheduleMaster.docId = this.laserDoctorsObj.docId;
      scheduleMaster.specialityId = 14;
      scheduleMaster.clinicCode = 1;
      scheduleMaster.entityType = 0;
      scheduleMaster.resourceType = 100;
      scheduleMaster.timeSlot = this.scheduleMasterForm!.get('timeSlot')?.value;
      scheduleMaster.exceptionalFlag = (this.scheduleMasterForm!.get('exceptionalFlag')?.value) ? 1 : 0;
      scheduleMaster.schedException = this.schedException;
      // Object.assign({}, scheduleMaster)
      let tempScheduleDays: ScheduleDay[] = [];
      let tempscheduleTimes: ScheduleTime[] = [];
      for (let i = 0; i < days.length; i++) {
        // let schStartDate = getDateObj(this.scheduleMasterForm.get('scheduleStart').value);
        // let schEndDate = getDateObj(this.scheduleMasterForm.get('scheduleEnd').value);
        let ScheduleDays: any = {}
        ScheduleDays.schedMasterSerial = scheduleMaster.serial;
        ScheduleDays.beginDate = new Date("2023-07-04");
        ScheduleDays.expiryDate = null;
        ScheduleDays.weekNo = 0;
        ScheduleDays.serial = days[i].serial;
        ScheduleDays.isSelected = days[i].isSelected;
        ScheduleDays.dayNo = days[i].dayNo;
        ScheduleDays.WeekDay = days[i].dayNo;
        tempScheduleDays.push(Object.assign({}, ScheduleDays));
        // Get the current date
        let count = 0;
        days[i].Shifts.forEach((shift: any, ind: any) => {
          count = count + 1;
          let currentFromDate = new Date("2023-07-04");
          let currentToDate = new Date("2023-07-04");
          let timeFrom = days[i].Shifts[ind].startTime;
          currentFromDate.setHours(Number(timeFrom.split(":")[0]));
          currentFromDate.setMinutes(Number(timeFrom.split(":")[1]));
          let timeTo = days[i].Shifts[ind].endTime;
          currentToDate.setHours(Number(timeTo.split(":")[0]));
          currentToDate.setMinutes(Number(timeTo.split(":")[1]));
          let scheduleTime: any = {}
          scheduleTime.startTime = currentFromDate;
          scheduleTime.endTime = currentToDate;
          scheduleTime.maxFollowupCout = 0;
          scheduleTime.maxReservationCount = 0;
          scheduleTime.parentId = 0
          scheduleTime.schedDaySerial = days[i].serial
          scheduleTime.serial = shift.id ? shift.id : (count) * -1
          scheduleTime.shiftId = 1
          scheduleTime.flagShiftOnOff = shift.flagShiftOnOff ? 1 : 0;

          tempscheduleTimes.push(Object.assign({}, scheduleTime));
        });
        scheduleMaster.reservForFutureReservation = this.scheduleMasterForm!.controls['reservForFutureReservation'].value;
        scheduleMaster.limitedDays = this.scheduleMasterForm!.controls['limitedDays'].value;
        let scheduling = <Scheduling>{};

        scheduling.scheduleMaster = scheduleMaster;
        // Object.assign(scheduling.scheduleMaster, scheduleMaster)
        scheduling.scheduleDays = tempScheduleDays;
        scheduling.scheduleTimes = tempscheduleTimes;

        this._LaserDoctorsService.addMasterSchedule(scheduling).subscribe((c: any) => {

          if (c.data && c.data[0]) {
            let serial = c.data[0]['serial'];
            this.SerialMaster = serial;

          }
        });
      }

    }

  }

  // changeFlagDay(day: any) {
  //   if (day.isSelected) {
  //     this.addNewShift(day);
  //   } else {
  //     day.isSelected = false
  //   }
  // }
  addNewShift(day: any) {
    day.isSelected = true
    if (day.Shifts) {
      day.Shifts.push({ dayNo: day.dayNo, flagShiftOnOff: true, serial: (day.Shifts.length + 1) * -1 })
    } else {
      day.Shifts = [{ dayNo: day.dayNo, flagShiftOnOff: true, serial: -1 }]
    }
  }
  onRowSelected(ev: any, row: any) {
    switch (ev) {
      case 402: //save code
        this.editTime(row);
        break;
      case 403: //save code
        this.deleteDay(row);
        break;
    }
  }
  editTime(row: any) {

  }
  deleteDay(row: any) {

  }
  sorting(byWhat: any) {
    this.sort = !this.sort;
    if (this.sort) {
      this.mergedData = this.mergedData.sort((a: any, b: any) => a[byWhat] > b[byWhat] ? 1 : -1)
    } else {
      this.mergedData = this.mergedData.sort((a: any, b: any) => a[byWhat] < b[byWhat] ? 1 : -1)
    }
  }
  mergeDataArrays(data1: any, data2: any) {
    this.mergedData = data1.map((item1: any) => {
      const correspondingItem = data2.filter((item2: any) => item2.parentId === item1.id);
      return { ...item1, children: correspondingItem };
    });
    this.scheduleMasterForm!.controls['scheduleDays'].value.forEach((days: any) => {
      days.Shifts = []

      this.mergedData.forEach((merge) => {
        if (merge.dayNo == days.dayNo) {
          days.serial = merge.id
          days.id = merge.id
          merge.children.forEach((element: any, index: any) => {
            element.flagShiftOnOff = element.flagShiftOnOff ? true : false;
            let date = new Date(element.startTime);
            if (days.Shifts[index]) {
              days.Shifts[index].startTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            } else {
              days.Shifts.push({ id: element.id, flagShiftOnOff: element.flagShiftOnOff, serial: element.id, parentId: element.parentId, startTime: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) })
            }
            let dateto = new Date(element.endTime);
            if (days.Shifts[index]) {
              days.Shifts[index].endTime = dateto.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            } else {
              days.Shifts.push({ id: element.id, flagShiftOnOff: element.flagShiftOnOff, serial: element.id, parentId: element.parentId, endTime: dateto.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) })
            }
            days.isSelected = true;

          });
        }
      });
    });
  }

  shift: any;

  // removeRow() {
  //   this._LaserDoctorsScheduleService.laserDoctorsScheduleDelete(this.shift)
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((schedules: any) => {
  //       this.getSchedules({ code: this.laserDoctorsObj.doctorId });
  //     },
  //       (error: any) => {
  //       }
  //     );
  // }

  toggleButton(shift: any) {
    shift.flagShiftOnOff = !shift.flagShiftOnOff;
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
