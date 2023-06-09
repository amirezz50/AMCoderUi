import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeRoutingModule } from './main-home-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagerModule } from 'src/shared/custom-pagination/custom-pagination.Module';
import { SheetOfHospitalComponent } from './sheet-of-hospital/sheet-of-hospital.component';
import { TasksAutoMatchedComponent } from './tasks-auto-matched/tasks-auto-matched.component';

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
    PagerModule
  ], exports: [LoginComponent,
    RegisterNewUserComponent]
})
export class MainHomeModule { }
