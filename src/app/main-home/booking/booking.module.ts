import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { FormsModule } from '@angular/forms';
import { BookingCreateComponent } from './booking-create/booking-create.component';
import { CustomSelectOptionModule } from 'src/shared/custom-select-option/custom-select-option.module';
import { PaginationModule } from 'src/shared/custom-pagination/custom-pagination.Module';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    BookingComponent,
    BookingDetailComponent,
    BookingCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomSelectOptionModule,
    PaginationModule,
    MatDialogModule

  ], exports: [
    BookingComponent,
  ]
})
export class BookingModule { }
