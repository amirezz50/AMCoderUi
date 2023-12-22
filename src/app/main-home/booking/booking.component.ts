import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingsFilter: any[] = []
  constructor(public _router: Router) { }
  behaviorSubjectObj: BehaviorSubject<any> | undefined;
  ngOnInit(): void {
    this.bookingsFilter = this.bookings
  }
  routeToLink(obj: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this._router.navigate(['/main-home/booking-detail', { id: obj.serial }]).then(value => { });
  }
  searchTerm: string = '';
  bookings = [
    {
      serial: 1,
      date: new Date(),
      docName: 'Ahmed mostafa',

      operationName: 'operation one',
      numOfSlot: 2,
      note: "test note"
    },
    {
      serial: 2,
      date: new Date(),
      docName: 'Eslam mohamed',
      operationName: 'operation two',
      numOfSlot: 3,
      note: "test note"

    },
  ];
  filterinTable() {
    this.bookingsFilter = this.bookings.filter(x =>
      x.docName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      x.operationName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      x.numOfSlot.toString().includes(this.searchTerm.toLowerCase()))
  }
}
