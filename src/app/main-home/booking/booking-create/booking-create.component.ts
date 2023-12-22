import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { BookingService } from '../booking.service';
import { SchedulDoctorService } from '../../schedul-doctor/schedul-doctor.service';

@Component({
  selector: 'booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {


  routeToLink() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/booking', {}]).then(value => { });
  }
  objBooking: any = {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _BookingService: BookingService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSelectize();
    this.getIdFromSnapShot()
    if (this.BookingId) {
      this.getBookingById(this.BookingId)
    } else {
      this.resetObj()
    }
  }
  doctorArr: any[] = [];
  patientArr: any[] = [];
  operationArr: any[] = [];
  docId: number = 0;
  patcode: number = 0;
  operationCode: number = 0;
  getSelectize() {
    this._BookingService.getAllSelectize({ type: 3 })//type:3 ==>operation
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.doctorArr = res.data;
            this.patientArr = res.data1;
            this.operationArr = res.data2
          }
        }
      )
  }
  getCodeFromArray(ev: any, type: number) {
    if (type == 1) {//doctor
      this.docId = ev;
    } else if (type == 2) {//patient
      this.patcode = ev;
    } else if (type == 3) {//operation
      this.operationCode = ev;
    }
  }
  resetObj() {
    this.objBooking.serial = -1;
    this.objBooking.procedure_Name = '';
    this.objBooking.procedure_Price = '';

  }
  addBooking() {
    if (this.objBooking.serial > 0) {
      this.updateBooking(this.objBooking)
    } else {
      this.saveBooking(this.objBooking)
    }

  }
  getBookingById(id: any) {
    this._BookingService.getAllBooking(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.objBooking = Object.assign({}, res.data[0]);
        } else {
          this.toastr.error(res);
        }
      })
  }
  saveBooking(row: any) {
    this.objBooking.serial = -1;
    this._BookingService.addBooking(this.objBooking)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          if (res && res.data && res.data[0].error) {
            this.toastr.error(res.data[0].error);
          } else {
            this.toastr.success("Done")
            this.resetObj()
          }
        } else if (Object.keys(res).length != 0) {
          this.toastr.error(res);
        }
      })
  }
  updateBooking(row: any) {
    this._BookingService.updateBooking(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          this.toastr.success("Updated Done")
          this.resetObj()
        } else if (Object.keys(res).length != 0) {
          this.toastr.error(res);
        }
      })
  }
  BookingId: any;
  getIdFromSnapShot() {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.BookingId = +x.params.id
  }
  // ----------------------------------------------------
  checkAvilableSlot(ev: any) {
    if (ev.target.value) {
      let obj = { reservationDate: new Date(ev.target.value).toISOString() }
      this._BookingService.checkAvailableSlots(obj)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            this.toastr.success("Updated Done")
            this.resetObj()
          } else if (Object.keys(res).length != 0) {
            this.toastr.error(res);
          }
        })
    }
  }
}
