import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BookingComponent,
    BookingDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

  ], exports: [
    BookingComponent,
  ]
})
export class BookingModule { }
