import { NgModule } from '@angular/core';

import { UserManagementRoutingModule } from './user-management-routing.module';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {SharedModule} from '../../../shared/shared.module';
import { UserDetailsComponent } from './popups/user-details/user-details.component';
import {TitleCasePipe} from '@angular/common';


@NgModule({
  declarations: [UserManagementComponent, UserDetailsComponent],
  imports: [
    UserManagementRoutingModule,
    SharedModule
  ],
  providers: []
})
export class UserManagementModule { }
