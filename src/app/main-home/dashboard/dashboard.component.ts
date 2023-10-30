import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './dashboard.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _DashboardService: DashboardService,

    public _toaster: ToastrService) { }
  arrayDashboard: any
  ngOnInit(): void {
    this.getAllDetails();
  }
  getAllDetails() {
    this._DashboardService.getAllDashboard({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.arrayDashboard = res.data;
          } else {
            this._toaster.warning(res.messages[0]);
          }
        }
      )
  }
}
