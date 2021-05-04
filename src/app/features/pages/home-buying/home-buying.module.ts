import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBuyingRoutingModule } from './home-buying-routing.module';
import { HomeBuyingComponent } from './components/home-buying/home-buying.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [HomeBuyingComponent],
  imports: [
    CommonModule,
    HomeBuyingRoutingModule,
    SharedModule
  ]
})
export class HomeBuyingModule { }
