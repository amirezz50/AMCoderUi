import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { MembershipService } from './membership.service';

@Component({
  selector: 'dynamic-setup-admin',
  templateUrl: './dynamic-setup-admin.component.html',
  styleUrls: ['./dynamic-setup-admin.component.css']
})
export class DynamicSetupAdminComponent implements OnInit {

  memberShipList: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _MemberShipervice: MembershipService,
    private toastr: ToastrService,
  ) { }
  routeToLink(serial: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/membership-detail', { id: serial }]).then(value => { });
  }
  ngOnInit(): void {
    this.getAllMemberShip();
  }

  isDropdownOpen = false;
  selectedOption: string | null = null;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onSelectRow(ev: any) {
    console.log(ev)
  }
  getAllMemberShip() {
    this._MemberShipervice.getAllMemberShip(0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.memberShipList = res.data
        } else {
          this.toastr.error(res);
        }
      })
  }
  deleteMemberShip(row: any) {
    this._MemberShipervice.deleteMemberShip(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getAllMemberShip()
        } else {
          this.toastr.error(res);
        }
      })
  }
  updateMemberShip(row: any) {
    this.routeToLink(row.serial)
  }
}
