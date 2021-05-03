import { NgModule } from '@angular/core';

import { NavigationRoutingModule } from './navigation-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {LoadingBarModule} from '@ngx-loading-bar/core';

@NgModule({
  imports: [
    NavigationRoutingModule,
    SharedModule,
    LoadingBarModule,
  ],
  declarations: [
    AdminLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class NavigationModule { }
