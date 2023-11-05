import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainHomeComponent } from './main-home.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SheetOfHospitalComponent } from './sheet-of-hospital/sheet-of-hospital.component';
import { TasksAutoMatchedComponent } from './tasks-auto-matched/tasks-auto-matched.component';
import { UsersComponent } from './Administration/users/users.component';
import { FinancialDoctorFeesComponent } from './financial-admin/financial-doctor-fees/financial-doctor-fees.component';
import { FinancialPatientFeesComponent } from './financial-admin/financial-patient-fees/financial-patient-fees.component';
import { DynamicSetupAdminComponent } from './Administration/dynamic-setup-admin/dynamic-setup-admin.component';
import { OperationManageComponent } from './Administration/operation-manage/operation-manage.component';
import { SchedulDoctorComponent } from './schedul-doctor/schedul-doctor.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
  {
    path: '',
    component: MainHomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterNewUserComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'upload-file', component: UploadFileComponent },
      { path: 'sheet-of-hospital', component: SheetOfHospitalComponent },
      { path: 'app-users', component: UsersComponent },
      { path: 'financial-doctor-fees', component: FinancialDoctorFeesComponent },
      { path: 'financial-patient-fees', component: FinancialPatientFeesComponent },
      { path: 'dynamic-setup-admin', component: DynamicSetupAdminComponent },
      { path: 'operation-manage', component: OperationManageComponent },
      { path: 'schedul-doctor', component: SchedulDoctorComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'booking-detail', component: BookingDetailComponent },

    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainHomeRoutingModule { }
