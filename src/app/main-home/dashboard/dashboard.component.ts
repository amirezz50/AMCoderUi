import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/shared/toast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _toastService: ToastService) { }

  ngOnInit(): void {
  }
  opentoast() {
    this._toastService.toastMsg('hello', 'error','Success')
  }
}
