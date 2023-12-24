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

  constructor(public _router: Router,
    private _BookingService: BookingService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,) { }
  bookingDetailCode: number | null = null;
  ngOnInit(): void {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.bookingDetailCode = +x.params.id


    if (this.bookingDetailCode) {
      this.getBookingById(this.bookingDetailCode)
    }
  }

  getBookingById(id: any) {
    this._BookingService.getAllBooking(id)
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
  bookingDetailObj: any = {}
  bookingDetailArr: any[] = []

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  deleteItem() {
    // Add your delete logic here
    alert('Item deleted!');
  }
  toogle: boolean = false;
  openMenu(event: any) {
    event.preventDefault();
    this.toogle = !this.toogle
  }




  //delete with procedure_code From BookingSchedula and split this ","

  deleteBooking(row: any) {
    this._BookingService.deleteBooking(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getBookingById(this.bookingDetailCode);
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
        this.deleteBooking(row);
      } else if (result === 'CLOSE') {
      }
    });
  }
}
