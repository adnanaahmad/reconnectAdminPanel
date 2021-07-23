import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamDynastyRoutingModule } from './team-dynasty-routing.module';
import { TeamDynastyComponent } from './components/team-dynasty/team-dynasty.component';
import {SharedModule} from '../../../shared/shared.module';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { RealEstateAgentsComponent } from './popups/real-estate-agents/real-estate-agents.component';


@NgModule({
  declarations: [TeamDynastyComponent, RealEstateAgentsComponent],
  imports: [
    CommonModule,
    TeamDynastyRoutingModule,
    SharedModule,
    OrganizationChartModule
  ]
})
export class TeamDynastyModule { }
