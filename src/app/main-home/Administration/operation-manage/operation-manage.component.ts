import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'operation-manage',
  templateUrl: './operation-manage.component.html',
  styleUrls: ['./operation-manage.component.css']
})
export class OperationManageComponent implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }
  update(id: number) {
    this.routeToLink(id);
  }
  routeToLink(id: number|null) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this._router.navigate(['/main-home/operation-manage-detail', { id: id }]).then(value => { });
  }

}
