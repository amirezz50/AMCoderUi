import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { BookingService } from './booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: any[] = []
  bookingsFilter: any[] = []
  pageIndex: number = 0;
  pageSize: number = 10;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _BookingService: BookingService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getBookingById(0)
  }
  routeToLink(link: string, serial: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this._router.navigate([link, { id: serial }]).then(value => { });
  }
  getBookingById(id: number) {
    this._BookingService.getAllBooking(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.bookings = Object.assign([], res.data);
          this.bookingsFilter = Object.assign([], res.data);
        } else {
          this.toastr.error(res);
        }
      })
  }
  searchTerm: string = '';
  filterinTable() {
    this.bookingsFilter = this.bookings.filter(x =>
      x.docName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      x.operationName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      x.numOfSlot.toString().includes(this.searchTerm.toLowerCase()))
  }


  deleteBooking(row: any) {
    this._BookingService.deleteBooking(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getBookingById(0);
          this.toastr.success("Deleted");
        } else {
          this.toastr.error(res);
        }
      })

  }
}
