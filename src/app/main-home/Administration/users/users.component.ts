import { Component, OnInit } from '@angular/core';
import { IUserDetails } from './users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userDetailsList: IUserDetails[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  constructor(public _router: Router) { }
  routeToLink(link: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate([link]).then(value => { });
  }
  ngOnInit(): void {
    this.userDetailsList = [{
      fullName: 'Amir Ezz',
      gender: 'Male',
      birthDate: '20/10/1980',
      phoneNumber: '010123456789',
      userType: 1,
      userRole: 1,
      confirm: true
    },
    {
      fullName: 'Mostafa Esmail',
      gender: 'Male',
      birthDate: '01/01/1975',
      phoneNumber: '010987654321',
      userType: 2,
      userRole: 2,
      confirm: true
    }]
  }

  isDropdownOpen = false;
  selectedOption: string | null = null;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onSelectRow(ev: any) {
    console.log(ev)
  }
}
