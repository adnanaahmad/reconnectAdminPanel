import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamDynastyComponent } from './components/team-dynasty/team-dynasty.component';

const routes: Routes = [{ path: '', component: TeamDynastyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamDynastyRoutingModule { }
