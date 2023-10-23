import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { CustomDropdownModule } from "../../../shared/custom-dropdown/custom-dropdown.module";
import { PagerModule } from 'src/shared/custom-pagination/custom-pagination.Module';
import { DynamicSetupAdminComponent } from './dynamic-setup-admin/dynamic-setup-admin.component';
import { OperationManageComponent } from './operation-manage/operation-manage.component';



@NgModule({
    declarations: [
        UsersComponent,
        DynamicSetupAdminComponent,
        OperationManageComponent
    ],
    exports: [UsersComponent],
    imports: [
        CommonModule,
        CustomDropdownModule,
        PagerModule
    ]
})
export class UsersModule { }
