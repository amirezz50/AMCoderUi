import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulDoctorService } from './schedul-doctor.service';
import { SchedulDoctorComponent } from './schedul-doctor.component';



@NgModule({
  declarations: [SchedulDoctorComponent],
  imports: [
    CommonModule
  ],
  exports: [SchedulDoctorComponent],
  providers: [SchedulDoctorService]
})
export class SchedulDoctorModule { }
