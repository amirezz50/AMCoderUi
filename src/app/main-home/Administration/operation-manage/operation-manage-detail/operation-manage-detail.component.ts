import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'operation-manage-detail',
  templateUrl: './operation-manage-detail.component.html',
  styleUrls: ['./operation-manage-detail.component.css']
})
export class OperationManageDetailComponent implements OnInit {

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
