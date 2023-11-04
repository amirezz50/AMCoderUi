import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulDoctorService } from './schedul-doctor.service';
import { FilterDoctorPipe, SchedulDoctorComponent } from './schedul-doctor.component';
import { FormsModule } from '@angular/forms';
import { CustomSelectOptionModule } from 'src/shared/custom-select-option/custom-select-option.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [SchedulDoctorComponent, FilterDoctorPipe],
  imports: [
    CommonModule,
    FormsModule, CustomSelectOptionModule,
    MatAutocompleteModule
  ],
  exports: [SchedulDoctorComponent],
  providers: [SchedulDoctorService]
})
export class SchedulDoctorModule { }
