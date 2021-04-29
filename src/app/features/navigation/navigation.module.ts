import { NgModule } from '@angular/core';

import { NavigationRoutingModule } from './navigation-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {UserComponent} from '../pages/user/user.component';
import {IconsComponent} from '../pages/icons/icons.component';
import {TypographyComponent} from '../pages/typography/typography.component';

@NgModule({
  imports: [
    NavigationRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    UserComponent,
    IconsComponent,
    TypographyComponent,
  ]
})
export class NavigationModule { }
