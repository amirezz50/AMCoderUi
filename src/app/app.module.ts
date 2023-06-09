import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginComponent } from './main-home/login/login.component';
import { RegisterNewUserComponent } from './main-home/register-new-user/register-new-user.component';
import { HttpGeneralService } from 'src/shared/http-general.service';
import { ToastrModule } from 'ngx-toastr';
import { HandleErrorService } from 'src/shared/handel-error';
import { LoggedInGuard } from 'src/shared/logged-in.guard';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { ToastComponent, ToastService } from 'src/shared/toast';
import { MainHomeModule } from './main-home/main-home.module';
import { WebsiteComponent } from './website/website.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainHomeComponent,
    ToastComponent,
    WebsiteComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MainHomeModule,
    TranslateModule.forRoot(),
    NgbModule,

  ],
  providers: [
    HttpGeneralService,
    HandleErrorService,
    LoggedInGuard,
    ToastService,
    TranslateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
