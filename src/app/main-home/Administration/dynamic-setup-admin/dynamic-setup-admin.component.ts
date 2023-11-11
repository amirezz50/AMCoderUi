import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dynamic-setup-admin',
  templateUrl: './dynamic-setup-admin.component.html',
  styleUrls: ['./dynamic-setup-admin.component.css']
})
export class DynamicSetupAdminComponent implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }
  update(id: number) {
    this.routeToLink(id);
  }
  routeToLink(id: number | null) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this._router.navigate(['/main-home/membership-detail', { id: id }]).then(value => { });
  }
  onSelectRow(ev: any) {

  }
}
