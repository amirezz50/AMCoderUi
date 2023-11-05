import { Injectable } from '@angular/core';
import { CONFIG } from 'src/shared/config';
import { HttpGeneralService } from 'src/shared/http-general.service';

const doctorUrl = CONFIG.baseUrls.Doctors
const ScheduleUrl = CONFIG.baseUrls.Schedule
@Injectable({
  providedIn: 'root'
})
export class SchedulDoctorService {

  constructor(private _http: HttpGeneralService) { }
  getAllDoctors(Dashboard: any) {
    return this._http.post<any>(`${doctorUrl}/GetAllDoctors`, Dashboard)
  }
  getScheduleByDocId(obj: any) {
    return this._http.post<any>(`${ScheduleUrl}/GetSchedulShiftsByDocId`, obj)
  }
  getResourceSchedulingList(resourceParams: any) {
    return this._http.post(`${ScheduleUrl}/GetResourceSchedules`, resourceParams)
  }
  addMasterSchedule(scheduling: Scheduling) {
    return this._http.post(`${ScheduleUrl}`, scheduling,)
  }
}

export interface ScheduleMaster {
  id: any | undefined,
  branchId: number | undefined,
  serial: number | undefined,
  resourceId: number | undefined,
  docId: number | undefined,
  resourceType: number | undefined,
  scheduleType: number | undefined,
  timeSlot: number | undefined,
  schedException: boolean | undefined,
  exceptionalFlag: number | undefined,
  branchIdParm?: number | undefined,
  specialityId: number | undefined,
  entityType: number | undefined,
  clinicCode?: number | undefined,
  overBookingLimit: number | undefined,
  maxReservationCount: number | undefined,
  maxFollowupCout: number | undefined,
  maxReservationCountDetail: number | undefined,
  limitedDays: number | undefined,
  reservForFutureReservation: number | undefined,
  twentyFourHour: number | undefined
}
export interface ScheduleDay {
  serial: number | undefined,
  dayNo?: number | undefined,
  schedMasterSerial: number | undefined,
  weekNo?: number | undefined,
  weekDay?: number | undefined,
  beginDate: Date | undefined,
  expiryDate?: Date | undefined,
  isSelected?: boolean
}
export interface ScheduleTime {
  maxFollowupCout: number | undefined,
  serial: number | undefined,
  startTime: any | undefined,
  endTime: any | undefined,
  schedDaySerial: number | undefined,
  parentId?: number | undefined,
  shiftId: number | undefined,
  maxReservationCount: number | undefined,
  twentyFourHour?: number | undefined,
}
export interface Scheduling {
  scheduleMaster: ScheduleMaster,
  scheduleDays: ScheduleDay[],
  scheduleTimes: ScheduleTime[]
}

export interface Day {
  day: number;
  dayName?: string;
  weekNo?: number;
  shifts: Shift[];
}
export enum scheduleMode {
  week = 1,
  monthDay = 2,
  monthWeek = 3
}
export interface Shift {
  serial: number;
  start: Date | undefined,
  end: Date
}
//end component
export enum weekDays {
  السبت = 1,
  الاحد,
  الاثنين,
  الثلاثاء,
  الاربعاء,
  الخميس,
  الجمعه,
}


export enum weekDaysEn {
  Saturday = 1,
  SunDay,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
}


export interface SchedulingVm {

  scheduleDays: ScheduleDay[] | undefined,
  scheduleTimes: ScheduleTime[]
  timeSlot: number | undefined,
  scheduleStart: any
  scheduleEnd: any | undefined,
  shifts: any[]
  //weekNo: number

}
