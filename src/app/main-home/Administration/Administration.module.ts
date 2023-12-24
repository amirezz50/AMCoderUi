import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { CustomDropdownModule } from "../../../shared/custom-dropdown/custom-dropdown.module";
import { PaginationModule } from 'src/shared/custom-pagination/custom-pagination.Module';
import { DynamicSetupAdminComponent } from './dynamic-setup-admin/dynamic-setup-admin.component';
import { OperationManageComponent } from './operation-manage/operation-manage.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { OperationManageDetailComponent } from './operation-manage/operation-manage-detail/operation-manage-detail.component';
import { MembershipDetailComponent } from './dynamic-setup-admin/membership-detail/membership-detail.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    UsersComponent,
    DynamicSetupAdminComponent,
    OperationManageComponent,
    UsersDetailComponent,
    OperationManageDetailComponent,
    MembershipDetailComponent
  ],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    CustomDropdownModule,
    PaginationModule,
    FormsModule,
    MatDialogModule
  ]
})
export class UsersModule { }
