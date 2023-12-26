import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BookingService } from '../booking.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  bookingDetailObj: any = {}
  bookingDetailArr: any[] = []
  isOpen = false;
  toogle: boolean = false;
  bookingDetailCode: number | null = null;
  constructor(public _router: Router,
    private _BookingService: BookingService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,) { }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.bookingDetailCode = +x.params.id
    if (this.bookingDetailCode) {
      this.getAllBookingDetailById(this.bookingDetailCode)
    }
  }

  getAllBookingDetailById(id: any) {
    this._BookingService.getAllBookingDetail(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.bookingDetailObj = Object.assign({}, res.data[0]);
          this.bookingDetailArr = Object.assign([], res.data);
        } else {
          this.toastr.error(res);
        }
      })
  }
  routeToLink() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/booking']).then(value => { });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  openMenu(event: any) {
    event.preventDefault();
    this.toogle = !this.toogle
  }
  deleteBookingDetail(row: any) {
    this._BookingService.deleteBookingDetail(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getAllBookingDetailById(this.bookingDetailCode);
        } else {
          this.toastr.error(res);
        }
      })
  }


  deletingOperation: any
  @ViewChild("delete", { static: true })
  delete: TemplateRef<any> | undefined;
  openPopupMail(row: any) {
    this.deletingOperation = row.procedure_Name
    const ChecksendMail = this.dialog.open(this.delete!, {});
    ChecksendMail.afterClosed().subscribe((result) => {
      if (result === 'Ok') {
        this.deleteBookingDetail(row);
      } else if (result === 'CLOSE') {
      }
    });
  }
  //-----------------------update---------------
  @ViewChild("update", { static: true })
  update: TemplateRef<any> | undefined;
  operationName: any = ''
  openUpdatePopup(row: any) {
    this.operationName = row.procedure_Name
    row.reservationDate = new Date(row.reservationDate)
    row.reservationDate.setHours(row.reservationDate.getHours() + 2);
    this.checkAvilableSlot({ reservationDate: row.reservationDate })
    const ChecksendMail = this.dialog.open(this.update!, {});
    ChecksendMail.afterClosed().subscribe((result) => {
      if (result === 'Ok') {
        this.updateBookingDetail(row);
      } else if (result === 'CLOSE') {
      }
    });
  }
  updateBookingDetail(row: any) {
    if (this.checkValidation(this.objBookingDetial) == -1) {
      return
    }
    this.objBookingDetial.serial = row.serial;
    this._BookingService.updateBookingDetail(this.objBookingDetial)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getAllBookingDetailById(this.bookingDetailCode);
        } else {
          this.toastr.error(res);
        }
      })
  }
  checkValidation(obj: any) {
    if (!obj.schecduleTimeSerial) {
      this.toastr.error("Please select time slot");
      return -1;
    }
    return 0;
  }
  arrShiftsTime: any[] = [];
  checkAvilableSlot(ev: any) {
    if (ev.reservationDate) {
      let obj = { reservationDate: new Date(ev.reservationDate).toISOString() }
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
  selectedTimeSlot: any
  objBookingDetial: any = {}
  selectRadioSchedulTime(ev: any) {
    if (ev) {
      this.objBookingDetial.schecduleTimeSerial = ev.serial
      // this.selectedTimeSlot = ev.serial
    }
  }

}
