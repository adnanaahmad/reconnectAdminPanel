import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
