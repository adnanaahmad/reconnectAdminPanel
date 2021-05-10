import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBuyingRoutingModule } from './home-buying-routing.module';
import { HomeBuyingComponent } from './components/home-buying/home-buying.component';
import {SharedModule} from '../../../shared/shared.module';
import { BlogComponent } from './components/blog/blog.component';
import { VideoComponent } from './components/video/video.component';
import { ResourcesComponent } from './components/resources/resources.component';


@NgModule({
  declarations: [HomeBuyingComponent, BlogComponent, VideoComponent, ResourcesComponent],
  imports: [
    CommonModule,
    HomeBuyingRoutingModule,
    SharedModule
  ]
})
export class HomeBuyingModule { }
