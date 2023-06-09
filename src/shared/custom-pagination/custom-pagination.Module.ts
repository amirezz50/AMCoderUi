import { NgModule } from '@angular/core';
import { PagerComponent } from './custom-pagination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PagerComponent

    ],
    imports: [
        FormsModule,

    ], exports: [PagerComponent]
})
export class PagerModule { }
