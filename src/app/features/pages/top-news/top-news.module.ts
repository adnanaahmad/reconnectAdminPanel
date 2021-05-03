import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopNewsRoutingModule } from './top-news-routing.module';
import {TopNewsComponent} from './components/top-news/top-news.component';
import {SharedModule} from '../../../shared/shared.module';
import { CreatePostComponent } from './popus/create-post/create-post.component';
import { AddExternalLinkComponent } from './popus/add-external-link/add-external-link.component';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TopNewsComponent, CreatePostComponent, AddExternalLinkComponent],
  imports: [
    SharedModule,
    TopNewsRoutingModule
  ],
  providers: [NgbDropdown]
})
export class TopNewsModule { }
