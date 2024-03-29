import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeRoutingModule } from './main-home-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PaginationModule } from 'src/shared/custom-pagination/custom-pagination.Module';
import { SheetOfHospitalComponent } from './sheet-of-hospital/sheet-of-hospital.component';
import { TasksAutoMatchedComponent } from './tasks-auto-matched/tasks-auto-matched.component';
import { UsersModule } from './Administration/Administration.module';
import { CustomDropdownModule } from 'src/shared/custom-dropdown/custom-dropdown.module';
import { FinancialAdminComponent } from './financial-admin/financial-admin.component';
import { FinancialAdminModule } from './financial-admin/financial-admin.module';
import { SchedulDoctorModule } from './schedul-doctor/schedul-doctor.module';
import { CustomSelectOptionModule } from 'src/shared/custom-select-option/custom-select-option.module';
import { BookingModule } from './booking/booking.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReviewComponent } from './review/review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterNewUserComponent,
    DashboardComponent,
    UploadFileComponent,
    SheetOfHospitalComponent,
    TasksAutoMatchedComponent,
    ReviewComponent,
    NotificationComponent,
  ],
  imports: [

    CommonModule,
    FormsModule,
    MainHomeRoutingModule,
    FontAwesomeModule,
    PaginationModule,
    UsersModule,
    FinancialAdminModule,
    CustomDropdownModule,
    SchedulDoctorModule,
    CustomSelectOptionModule,
    BookingModule,
    MatDialogModule,
    NgbModule
  ], exports: [LoginComponent,
    RegisterNewUserComponent]
})
export class MainHomeModule { }
