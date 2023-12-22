import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { FormsModule } from '@angular/forms';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import { CustomSelectOptionModule } from 'src/shared/custom-select-option/custom-select-option.module';
@NgModule({
  declarations: [
    BookingComponent,
    BookingDetailComponent,
    BookingCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomSelectOptionModule

  ], exports: [
    BookingComponent,
  ]
})
export class BookingModule { }
