import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProceduresManageService } from '../procedures-manage.service';

@Component({
  selector: 'operation-manage-detail',
  templateUrl: './operation-manage-detail.component.html',
  styleUrls: ['./operation-manage-detail.component.css']
})
export class OperationManageDetailComponent implements OnInit {

  objProcedures: any = {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _ProceduresManageService: ProceduresManageService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  routeToLink() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/operation-manage', {}]).then(value => { });
  }
  ngOnInit(): void {
    this.getIdFromSnapShot()
    if (this.ProceduresId) {
      this.getProceduresById(this.ProceduresId)
    } else {
      this.resetObj()
    }
  }
  resetObj() {
    this.objProcedures.serial = -1;
    this.objProcedures.procedure_Name = '';
    this.objProcedures.procedure_Price = '';

  }
  addProcedures() {
    if (this.objProcedures.serial > 0) {
      this.updateProcedures(this.objProcedures)
    } else {
      this.saveProcedures(this.objProcedures)
    }

  }
  getProceduresById(id: any) {
    this._ProceduresManageService.getAllProcedures(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.objProcedures = Object.assign({}, res.data[0]);
        } else {
          this.toastr.error(res);
        }
      })
  }
  saveProcedures(row: any) {
    this.objProcedures.serial = -1;
    this._ProceduresManageService.addProcedures(this.objProcedures)
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
  updateProcedures(row: any) {
    this._ProceduresManageService.updateProcedures(row)
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
  ProceduresId: any;
  getIdFromSnapShot() {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.ProceduresId = +x.params.id
  }
}
