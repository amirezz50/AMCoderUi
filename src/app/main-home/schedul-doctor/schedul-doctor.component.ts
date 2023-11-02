import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SchedulDoctorService } from './schedul-doctor.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'schedul-doctor',
  templateUrl: './schedul-doctor.component.html',
  styleUrls: ['./schedul-doctor.component.css']
})
export class SchedulDoctorComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  doctorArr: any[] = [];

  constructor(private _SchedulDoctorService: SchedulDoctorService) { }

  ngOnInit(): void {
    this.getDoctors();
  }
  scheduleMasterForm: FormGroup | undefined;

  UnitList: any[] = []
  save() { }
  // sort: boolean = false;
  // sorting(byWhat:any) {
  //   this.sort = !this.sort;
  //   if (this.sort) {
  //     this.UnitList = this.UnitList.sort((a: any, b: any) => a[byWhat] > b[byWhat] ? 1 : -1)
  //   } else {
  //     this.UnitList = this.UnitList.sort((a: any, b: any) => a[byWhat] < b[byWhat] ? 1 : -1)
  //   }
  // }
  scheduleDays: any[] = [{ textEn: "aa", Shifts: [{}] }];
  selectedDoctor: any;
  searchTerm: string = '';
  addNewUnit() { }
  onBtnsClicked(number: number) { }
  addNewShift(day: any) { }
  openCheckDelete(shift: any) { }
  toggleButton(shift: any) { }
  getDoctors() {
    this._SchedulDoctorService.getAllDoctors({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.doctorArr = []
            this.doctorArr = res.data.data
          }
        }
      )
  }

}
import { Pipe, PipeTransform } from '@angular/core';

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
