import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  objUser: any = {}
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _usersService: UsersService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  routeToLink() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/app-users', {}]).then(value => { });
  }
  ngOnInit(): void {
    this.getIdFromSnapShot()
    if (this.userId) {
      this.getUserById(this.userId)
    } else {
      this.resetObj()
    }
  }
  resetObj() {
    this.objUser.userId = 0;
    this.objUser.fullName = '';
    this.objUser.password = '';
    this.objUser.gender = 1;
    this.objUser.birthDate = new Date().toISOString().split('T')[0];
    this.objUser.phoneNumber = '';
    this.objUser.userType = 1;
    this.objUser.userRole = 1;
    this.objUser.confirmToLogin = 1;
    this.objUser.emial = 1;
    this.objUser.userName = '';
  }
  addUser() {
    this.objUser.confirmTOLogin = +this.objUser.confirmTOLogin
    this.objUser.userRole = +this.objUser.userRole
    if (this.objUser.userId > 0) {
      this.updateUser(this.objUser)
    } else {
      this.saveUser(this.objUser)
    }

  }
  getUserById(id: any) {
    this._usersService.getAllUsers(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.objUser = Object.assign({}, res.data[0]);
          if (res.data[0].birthDate)
            this.objUser.birthDate = new Date(this.objUser.birthDate).toISOString().split('T')[0];
        } else {
          this.toastr.error(res);
        }
      })
  }
  saveUser(row: any) {
    this.objUser.userId = -1;
    this._usersService.addUsers(this.objUser)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          if (res && res.data && res.data[0].error) {
            this.toastr.error(res.data[0].error);
          } else {
            this.toastr.success("Done")
            this.resetObj();
            this.routeToLink();
          }
        } else if (Object.keys(res).length != 0) {
          this.toastr.error(res);
        }
      })
  }
  updateUser(row: any) {
    this._usersService.updateUsers(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res && res.data) || (Object.keys(res).length == 0)) {
          this.toastr.success("Updated Done")
          this.resetObj();
          this.routeToLink();
        } else if (Object.keys(res).length != 0) {
          this.toastr.error(res);
        }
      })
  }
  userId: any;
  getIdFromSnapShot() {
    if (this.route.snapshot.paramMap)
      var x: any = this.route.snapshot.paramMap;
    if (x && x.params && x.params.id)
      this.userId = +x.params.id
  }
}
