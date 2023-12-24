import { NgModule } from '@angular/core';
import { PaginationComponent } from './custom-pagination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PaginationComponent

    ],
    imports: [
        FormsModule,

    ], exports: [PaginationComponent]
})
export class PaginationModule { }
