import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {AuthGuard} from '../../core/authGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-management',
        loadChildren: () => import('../pages/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'top-news',
        loadChildren: () => import('../pages/top-news/top-news.module').then(m => m.TopNewsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
