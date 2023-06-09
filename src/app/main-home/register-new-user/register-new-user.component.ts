import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IRegisterForm } from './registerModel';
import { RegisterNewUserService } from './register-new-user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {
  @Output() rigesterPage = new EventEmitter<boolean>();
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  registerModel: IRegisterForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  constructor(private _registerService: RegisterNewUserService) { }

  ngOnInit(): void {
  }
  // var headers = new HttpHeaders().set('Content-Type', 'application/json');
  backlogin() {
    this.rigesterPage.emit(false)
  }
  register() {
    if (
      !this.registerModel.email &&
      !this.registerModel.password &&
      !this.registerModel.firstName &&
      !this.registerModel.lastName
    ) {
      return
    }
    this._registerService.register(this.registerModel)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.backlogin();
        }
      )
  }
}
