import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectOptionComponent } from './custom-select-option.component';



@NgModule({
  declarations: [CustomSelectOptionComponent],
  imports: [
    CommonModule,
  ], exports: [CustomSelectOptionComponent]
})
export class CustomSelectOptionModule { }
