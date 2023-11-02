import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeRoutingModule } from './main-home-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PagerModule } from 'src/shared/custom-pagination/custom-pagination.Module';
import { SheetOfHospitalComponent } from './sheet-of-hospital/sheet-of-hospital.component';
import { TasksAutoMatchedComponent } from './tasks-auto-matched/tasks-auto-matched.component';
import { UsersModule } from './Administration/Administration.module';
import { CustomDropdownModule } from 'src/shared/custom-dropdown/custom-dropdown.module';
import { FinancialAdminComponent } from './financial-admin/financial-admin.component';
import { FinancialAdminModule } from './financial-admin/financial-admin.module';
import { SchedulDoctorModule } from './schedul-doctor/schedul-doctor.module';
import { CustomSelectOptionModule } from 'src/shared/custom-select-option/custom-select-option.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterNewUserComponent,
    DashboardComponent,
    UploadFileComponent,
    SheetOfHospitalComponent,
    TasksAutoMatchedComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    MainHomeRoutingModule,
    FontAwesomeModule,
    PagerModule,
    UsersModule,
    FinancialAdminModule,
    CustomDropdownModule,
    SchedulDoctorModule,
    CustomSelectOptionModule
  ], exports: [LoginComponent,
    RegisterNewUserComponent]
})
export class MainHomeModule { }
