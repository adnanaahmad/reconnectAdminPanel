import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopNewsRoutingModule } from './top-news-routing.module';
import {TopNewsComponent} from './components/top-news/top-news.component';
import {SharedModule} from '../../../shared/shared.module';
import { CreatePostComponent } from './popus/create-post/create-post.component';


@NgModule({
  declarations: [TopNewsComponent, CreatePostComponent],
  imports: [
    SharedModule,
    TopNewsRoutingModule
  ]
})
export class TopNewsModule { }
