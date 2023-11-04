import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './website.component';
import { WebsiteRoutingModule } from './website-routing.component';



@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
  ],exports:[WebsiteComponent]
})
export class WebsiteModule { }
