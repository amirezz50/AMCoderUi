import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropdown } from './custom-dropdow.component';



@NgModule({
  declarations: [CustomDropdown],
  imports: [
    CommonModule
  ], exports: [CustomDropdown]
})
export class CustomDropdownModule { }
