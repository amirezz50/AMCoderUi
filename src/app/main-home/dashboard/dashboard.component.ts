import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './dashboard.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _DashboardService: DashboardService,

    public _toaster: ToastrService, private dialog: MatDialog,) { }
  arrayDashboard: any = {
    sumUserId: 0,
    active: 0,
    disActive: 0,
    numberPatient: 0,
    numberDoctor: 0,
  }
  userPendingList: any[] = []
  doctorScheduleList: any[] = []
  ngOnInit(): void {
    this.getAllDetails();
  }
  getAllDetails() {
    this._DashboardService.getAllDashboard({})
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res && res.data) {
            this.arrayDashboard = res.data[0];
            this.userPendingList = res.data1;
            this.doctorScheduleList = res.data2;

          } else {
            this._toaster.error(res);
          }
        }
      )
  }
  @ViewChild("delete", { static: true })
  delete: TemplateRef<any> | undefined;
  openPopUp() {
    const CheckDelete = this.dialog.open(this.delete!, {});
    CheckDelete.afterClosed().subscribe((result) => {
      if (result === 'Ok') {
        // Ok button clicked
        console.log('Ok clicked');
      } else if (result === 'CLOSE') {
        // CLOSE button clicked
        console.log('CLOSE clicked');
      }
    });
    // this.dialog.open(PopupContentComponent, {
    //   width: '400px',
    //   // You can add more configuration options here
    // });
  }
  updateUserConfirm(row: any, confirmTOLogin: number) {
    row.confirmTOLogin = confirmTOLogin;
    this._DashboardService.updateUsers(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          this._toaster.success("Updated Done")
          this.getAllDetails();
        } else if (Object.keys(res).length != 0) {
          this._toaster.error(res);
        }
      })
  }
}
