import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialAdminComponent } from './financial-admin.component';
import { FinancialDoctorFeesComponent } from './financial-doctor-fees/financial-doctor-fees.component';
import { FormsModule } from '@angular/forms';
import { FinancialPatientFeesComponent } from './financial-patient-fees/financial-patient-fees.component';
import { CustomSelectOptionModule } from 'src/shared/custom-select-option/custom-select-option.module';



@NgModule({
  declarations: [
    FinancialAdminComponent,
    FinancialDoctorFeesComponent,
    FinancialPatientFeesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomSelectOptionModule
  ],
  exports: [
    FinancialAdminComponent,
    FinancialDoctorFeesComponent
  ]
})
export class FinancialAdminModule { }
