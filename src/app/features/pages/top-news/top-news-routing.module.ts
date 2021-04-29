import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopNewsComponent} from './components/top-news/top-news.component';


const routes: Routes = [{ path: '', component: TopNewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopNewsRoutingModule { }
