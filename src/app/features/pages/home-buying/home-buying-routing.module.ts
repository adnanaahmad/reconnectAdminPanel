import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeBuyingComponent } from './components/home-buying/home-buying.component';

const routes: Routes = [{ path: '', component: HomeBuyingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeBuyingRoutingModule { }
