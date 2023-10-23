import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _ToastrService: ToastrService) { }

  ngOnInit(): void {
  }
  opentoast() {
    this._ToastrService.success('hello', 'error')
  }
}
