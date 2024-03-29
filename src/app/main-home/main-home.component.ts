import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {
  flagSideBar: boolean = false;
  titleSideBar: string = 'Dashboard';
  constructor(
    public _authService: LoginService,
    public _router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.setRoutLink('/main-home/dashboard');
  }
  setRoutLink(routePath: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate([routePath, { mode: null }]).then(value => { });
  }
  logToggel: boolean = false
  changeTitlePages(title: string) {
    this.titleSideBar = title;
  }
  openDialog() {
    this.logToggel = true;
  }
  cancelDialog() {
    this.logToggel = false;
  }
  logout() {
    this._authService.islogginNew = false
    this._authService.clearCache();
    this.logToggel = false;
  }
  obj: any = { toggelSetup: false, financialSetup: false }

  generalToggel(x: string) {
    this.obj[x] = !this.obj[x];
  }
  changeSideBar() {
    this.flagSideBar = !this.flagSideBar
  }
  // logout() {
  //   // this._authService.isLoggin = false;
  //   sessionStorage.clear();
  //   location.reload();
  // }
}
