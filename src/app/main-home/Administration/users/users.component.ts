import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUserDetails } from './users.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
  ) { }
  routeToLink(userId: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this._router.navigate(['/main-home/app-users-detail', { id: userId }]).then(value => { });
  }
  ngOnInit(): void {
    this.getAllUser();
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
    this.routeToLink(row.userId)
  }
  subjectMail: string = "";
  bodyMail: string = "";
  sendMailFun(row: any) {
    if (row.email) {
      let obj = {
        toAddress: row.email,
        subject: this.subjectMail,
        body: this.bodyMail,
      }
      this._usersService.sendMail(obj)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res: any) => {
          if ((res && res.data) || (Object.keys(res).length == 0)) {
            this.toastr.success("Email sent successfully");
          } else if (Object.keys(res).length != 0) {
            this.toastr.error(res);
          }
        })
    } else {
      this.toastr.error("This User does not have an email");
    }
  }
  @ViewChild("sendMail", { static: true })
  sendMail: TemplateRef<any> | undefined;
  openPopupMail(row: any) {
    const ChecksendMail = this.dialog.open(this.sendMail!, {});
    ChecksendMail.afterClosed().subscribe((result) => {
      if (result === 'Ok') {
        this.sendMailFun(row);
        console.log('Ok clicked');
      } else if (result === 'CLOSE') {
        // CLOSE button clicked
        console.log('CLOSE clicked');
      }
    });
  }
  imgURL: any
  fileDataCv: any = {}
  onFileChanged(event: any) {
    // Get the file selected.
    this.fileDataCv = {}
    this.fileDataCv.file = event.target.files[0];
    this.fileDataCv.dataName = event.target.files[0].name;
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
    const formData: FormData = new FormData();
    formData.append('dataName', event.target.files[0].name);
    formData.append('file', event.target.files[0], event.target.files[0].name);
    console.log('FormData:', formData);
    this._usersService.addImage(formData)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (event: any) => {
          console.log(event);
        });
  }
}
