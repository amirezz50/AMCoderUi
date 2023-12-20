import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MembershipService } from '../membership.service';

@Component({
  selector: 'membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.css']
})
export class MembershipDetailComponent implements OnInit {

  objMemberShip: any = {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _MembershipService: MembershipService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  routeToLink() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/dynamic-setup-admin', {}]).then(value => { });
  }
  ngOnInit(): void {
    this.getIdFromSnapShot()
    if (this.MemberShipId) {
      this.getMemberShipById(this.MemberShipId)
    } else {
      this.resetObj()
    }
  }
  resetObj() {
    this.objMemberShip.serial = -1;
    this.objMemberShip.mem_Name = '';
    this.objMemberShip.mem_Value = '';

  }
  addMemberShip() {
    if (this.objMemberShip.serial > 0) {
      this.updateMemberShip(this.objMemberShip)
    } else {
      this.saveMemberShip(this.objMemberShip)
    }

  }
  getMemberShipById(id: any) {
    this._MembershipService.getAllMemberShip(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.objMemberShip = Object.assign({}, res.data[0]);
        } else {
          this.toastr.error(res);
        }
      })
  }
  saveMemberShip(row: any) {
    this.objMemberShip.serial = -1;
    this._MembershipService.addMemberShip(this.objMemberShip)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          if (res && res.data && res.data[0].error) {
            this.toastr.error(res.data[0].error);
          } else {
            this.toastr.success("Done")
            this.resetObj()
          }
        } else if (Object.keys(res).length != 0) {
          this.toastr.error(res);
        }
      })
  }
  updateMemberShip(row: any) {
    this._MembershipService.updateMemberShip(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          this.toastr.success("Updated Done")
          this.resetObj()
        } else if (Object.keys(res).length != 0) {
          this.toastr.error(res);
        }
      })
  }
  MemberShipId: any;
  getIdFromSnapShot() {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.MemberShipId = +x.params.id
  }
}
