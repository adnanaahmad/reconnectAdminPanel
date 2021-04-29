import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {DashboardComponent} from '../pages/dashboard/dashboard.component';
import {IconsComponent} from '../pages/icons/icons.component';
import {UserComponent} from '../pages/user/user.component';
import {TypographyComponent} from '../pages/typography/typography.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'user-management',
        loadChildren: () => import('../pages/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'top-news',
        loadChildren: () => import('../pages/top-news/top-news.module').then(m => m.TopNewsModule)
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'user', component: UserComponent },
      { path: 'typography', component: TypographyComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
