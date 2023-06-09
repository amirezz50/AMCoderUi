import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainHomeComponent } from './main-home.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SheetOfHospitalComponent } from './sheet-of-hospital/sheet-of-hospital.component';


const routes: Routes = [
  {
    path: '',
    component: MainHomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterNewUserComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'upload-file', component: UploadFileComponent },
      { path: 'sheet-of-hospital', component: SheetOfHospitalComponent }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainHomeRoutingModule { }
