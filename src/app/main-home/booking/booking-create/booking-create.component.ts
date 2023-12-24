import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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
  bindUpdateObj(row: any) {
    this.docId = row.docId
    this.bindCode = row.docId;
    this.objBooking.reservationDate = new Date(row.reservationDate)
    this.objBooking.reservationDate.setHours(this.objBooking.reservationDate.getHours() + 2);
    this.objBooking.reservationDate = this.objBooking.reservationDate.toISOString().split("T")[0]
    this.checkAvilableSlot({ value: this.objBooking.reservationDate })
    // this.arrShiftsTime.splice(row.schecduleTimeSerial, 1)

    this.operationArr = this.operationArr.map(element => {
      return { ...element, selected: this.objBooking.operationSelected.split(",").includes(element.code.toString()) };
    });


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
    this.docId = 0;
    this.patcode = 0;
    this.operationCode = 0;

    this.objBooking.reservationDate = new Date().toISOString()
    this.objBooking.schecduleTimeSerial = 0;
    this.selectedTimeSlot = 0
    this.objBooking.numSlot = 0
    this.objBooking.operationSelected = "";

  }
  addBooking() {
    if (this.objBooking.serial > 0) {
      this.updateBooking(this.objBooking)
    } else {
      this.saveBooking(this.objBooking)
    }

  }
  bindCode: any = 0
  getBookingById(id: any) {
    this._BookingService.getAllBooking(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.getSelectize();
          this.objBooking = Object.assign({}, res.data[0]);
          if (this.objBooking) {
            this.bindUpdateObj(this.objBooking)

          }
        } else {
          this.toastr.error(res);
        }
      })
  }
  saveBooking(row: any) {
    let obj: any = {}
    obj.serial = -1;
    obj.docId = this.docId;
    if (this.objBooking.reservationDate && this.objBooking.reservationDate != new Date(this.objBooking.reservationDate).toISOString())
      obj.reservationDate = new Date(this.objBooking.reservationDate).toISOString();
    obj.schecduleTimeSerial = this.selectedTimeSlot;
    obj.numSlot = this.objBooking.numSlot;
    obj.note = this.objBooking.note;
    obj.operationSelected = "";
    this.operationArr.forEach(op => {
      if (op.selected) {
        obj.operationSelected += op.code.toString() + ","
      }
    });
    if (this.checkValidation(obj, 1) == -1) {
      return;
    }
    // this.arrShiftsTime.forEach(op => {
    //   if (op.selected) {
    //     this.objBooking.schecduleTimeSelected.concate(op.serial + ",")
    //   }
    // });
    this._BookingService.addBooking(obj)
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
    let obj: any = {}

    obj.docId = this.docId;
    if (this.objBooking.reservationDate && this.objBooking.reservationDate != new Date(this.objBooking.reservationDate).toISOString())
      obj.reservationDate = new Date(this.objBooking.reservationDate).toISOString();
    obj.schecduleTimeSerial = this.selectedTimeSlot;
    obj.numSlot = this.objBooking.numSlot;
    obj.note = this.objBooking.note;
    obj.operationSelected = "";
    this.operationArr.forEach(op => {
      if (op.selected) {
        obj.operationSelected += op.code.toString() + ","
      }
    });
    if (this.checkValidation(obj, 2) == -1) {
      return;
    }
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
  checkValidation(obj: any, type: any): number {
    if (!obj.docId) {
      this.toastr.error("Please select doctor");
      return -1;
    }
    if (!obj.reservationDate) {
      this.toastr.error("Please select reservation date");
      return -1;
    }
    if (!obj.schecduleTimeSerial) {
      this.toastr.error("Please select time slot");
      return -1;
    }
    if (obj.operationSelected == "" && type == 1) {
      this.toastr.error("Please select operation");
      return -1;
    }
    if (obj.numSlot <= 0) {
      this.toastr.error("Please fill number of slot");
      return -1;
    }
    return 0;
  }
  BookingId: any;
  getIdFromSnapShot() {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.BookingId = +x.params.id
  }
  // ----------------------------------------------------
  arrShiftsTime: any[] = [];
  selectedTimeSlot: any | null = null;
  numSlot: number = 0;
  checkAvilableSlot(ev: any) {
    if (ev.value) {
      let obj = { reservationDate: new Date(ev.value).toISOString() }
      this._BookingService.checkAvailableSlots(obj)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            this.arrShiftsTime = res.data;
          } else if (Object.keys(res).length != 0) {
            this.toastr.error(res);
          }
        })
    }
  }
  selectRadioSchedulTime(ev: any) {
    if (ev) {
      this.selectedTimeSlot = ev.serial
      this.numSlot = ev.avilableSlot
    }
  }
  checkOnNumSlot(ev: any) {
    if (ev && ev.target && ev.target.value) {
      if (ev.target.value > this.numSlot) {
        this.objBooking.numSlot = this.numSlot;
        this.toastr.error("Current Number is greater than Old number of slot");
        return
      } else {
        this.objBooking.numSlot = +ev.target.value;
      }
    }
  }
}
