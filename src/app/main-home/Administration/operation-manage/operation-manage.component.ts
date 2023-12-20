import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProceduresManageService } from './procedures-manage.service';

@Component({
  selector: 'operation-manage',
  templateUrl: './operation-manage.component.html',
  styleUrls: ['./operation-manage.component.css']
})
export class OperationManageComponent implements OnInit {


  procedureList: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _ProceduresManageService: ProceduresManageService,
    private toastr: ToastrService,
  ) { }
  routeToLink(serial: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/operation-manage-detail', { id: serial }]).then(value => { });
  }
  ngOnInit(): void {
    this.getAllProcedures();
  }

  isDropdownOpen = false;
  selectedOption: string | null = null;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onSelectRow(ev: any) {
    console.log(ev)
  }
  getAllProcedures() {
    this._ProceduresManageService.getAllProcedures(0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.procedureList = res.data
        } else {
          this.toastr.error(res);
        }
      })
  }
  deleteProcedures(row: any) {
    this._ProceduresManageService.deleteProcedures(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getAllProcedures()
        } else {
          this.toastr.error(res);
        }
      })
  }
  updateProcedures(row: any) {
    this.routeToLink(row.serial)
  }

}
