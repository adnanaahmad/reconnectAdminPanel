import { NgModule } from '@angular/core';
import { TopNewsRoutingModule } from './top-news-routing.module';
import {TopNewsComponent} from './components/top-news/top-news.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TopNewsComponent],
  imports: [
    SharedModule,
    TopNewsRoutingModule
  ],
  providers: [NgbDropdown]
})
export class TopNewsModule { }
