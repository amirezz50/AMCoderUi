import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';

@Component({
  selector: 'booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  constructor(public _router: Router, private route: ActivatedRoute) { }
  bookingDetailCode: number | null = null;
  ngOnInit(): void {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.bookingDetailCode = +x.params.id
    this.bookingDetailCode = this.bookingDetailCode! - 1
  }
  routeToLink() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/booking']).then(value => { });
  }
  bookingsMaster = [
    {
      serial: 1,
      date: new Date(),
      operationName: 'operation one',
      docName: 'Ahmed mostafa',
      numOfSlot: 2,
      note: "test note",
      listOfPatient: [{
        serial: 1,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Ayman Ashraf',
        numOfSlot: 3,
        cost: 1500,
        status: "Going"
      },
      {
        serial: 2,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Ali mallol',
        numOfSlot: 3,
        note: "Going",
        cost: 3400,

        status: "Going"

      },
      {
        serial: 3,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Eisa Magdy',
        numOfSlot: 3,
        note: "Going",
        cost: 2700,

        status: "Going"
      },
      {
        serial: 4,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Elsayed Morgan',
        numOfSlot: 3,
        note: "Pending",
        cost: 1300,

        status: "Going"
      }]
    },
    {
      serial: 2,
      date: new Date(),
      operationName: 'operation two',
      docName: 'Eslam mohamed',
      numOfSlot: 3,
      note: "test note",
      listOfPatient: [{
        serial: 1,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Zaki kamel',
        numOfSlot: 3,
        note: "test note",
        cost: 1050,

        status: "Going"
      },
      {
        serial: 2,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Esmail elshazly',
        numOfSlot: 3,
        note: "test note",
        cost: 720,
        status: "Going"
      },
      {
        serial: 3,
        date: new Date(),
        operationName: 'operation two',
        patName: 'kareem mohamed',
        numOfSlot: 3,
        note: "test note",
        cost: 450,
        status: "Going"
      },
      {
        serial: 4,
        date: new Date(),
        operationName: 'operation two',
        patName: 'Gamal Elsayed',
        numOfSlot: 3,
        note: "test note",
        cost: 7800,
        status: "Going"
      }]

    },
  ];

}
