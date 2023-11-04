import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectOptionComponent } from './custom-select-option.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomSelectOptionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule
  ], exports: [CustomSelectOptionComponent]
})
export class CustomSelectOptionModule { }
