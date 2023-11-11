import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.css']
})
export class MembershipDetailComponent implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }
  routeToLink(link: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate([link, {}]).then(value => { });
  }

}
