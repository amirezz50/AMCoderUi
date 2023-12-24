import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from './login.service';
import { merge } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public _authService: LoginService,
    private _router: Router,
    private toastr: ToastrService,


  ) { }
  loginModel: any = {}
  authResult: any
  showRegisterForm: boolean = false
  showForgetPass: boolean | undefined
  ngOnInit(): void {
  }
  login() {
    if ((this.loginModel.email == undefined || this.loginModel.email == null || !this.loginModel.email.replace(/\s/g, '').length) ||
      (this.loginModel.password == undefined || this.loginModel.password == null || !this.loginModel.password.replace(/\s/g, '').length)) {

      this.toastr.error("Pleace enter correct form", "Error")
      return;
    } else {
      sessionStorage.setItem('UserModel', JSON.stringify(this.loginModel));
    }


    this._authService.login(this.loginModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.authResult = res;
          if (res && res.array) {
            localStorage.setItem('token', res.array.token);
            sessionStorage.setItem('UserData', JSON.stringify(res));
            this._router.navigateByUrl('/main-home');
            this.toastr.info('Welcome');

          } else if (res && res.messages && res.messages.length > 0) {
            this.toastr.error(res.messages[0], 'Error');
          }
          // this._authService.islogginNew = true

        })

  }
  registerationForm(active: boolean) {
    this.showRegisterForm = active
  }


}
