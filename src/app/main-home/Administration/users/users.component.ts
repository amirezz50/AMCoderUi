import { Component, OnInit } from '@angular/core';
import { IUserDetails } from './users.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userDetailsList: IUserDetails[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public _router: Router,
    private _usersService: UsersService,
    private toastr: ToastrService,
  ) { }
  routeToLink(obj: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/app-users-detail', { id: obj.userId }]).then(value => { });
  }
  ngOnInit(): void {
    this.getAllUser();
    // [{
    //   fullName: 'Amir Ezz',
    //   gender: 'Male',
    //   birthDate: '20/10/1980',
    //   phoneNumber: '010123456789',
    //   userType: 1,
    //   userRole: 1,
    //   confirm: true
    // },
    // {
    //   fullName: 'Mostafa Esmail',
    //   gender: 'Male',
    //   birthDate: '01/01/1975',
    //   phoneNumber: '010987654321',
    //   userType: 2,
    //   userRole: 2,
    //   confirm: true
    // }]
  }

  isDropdownOpen = false;
  selectedOption: string | null = null;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onSelectRow(ev: any) {
    console.log(ev)
  }
  getAllUser() {
    this._usersService.getAllUsers(0)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if (res && res.data) {
          this.userDetailsList = res.data
        } else {
          this.toastr.error(res);
        }
      })
  }
  deleteUser(row: any) {
    this._usersService.deleteUsers(row)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        if ((res) || (Object.keys(res).length == 0)) {
          this.getAllUser()
        } else {
          this.toastr.error(res);
        }
      })
  }
  updateUser(row: any) {
    this.routeToLink(row)
  }
}
