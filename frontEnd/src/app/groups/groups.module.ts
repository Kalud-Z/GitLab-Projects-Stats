import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsChartsComponent } from './groups-container/groups-charts/groups-charts.component';
import { GroupsListComponent } from './groups-container/groups-list/groups-list.component';
import { RouterModule } from '@angular/router';
import { GroupsContainerComponent } from './groups-container/groups-container.component';
import { SharedModule } from '../shared/shared.module';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { GroupsCardsComponent } from './groups-container/groups-cards/groups-cards.component';
import { GroupsOverviewComponent } from './groups-container/groups-overview/groups-overview.component';
import { SearchProjectOrGroupPipe } from './_shared/_pipes/search-project-or-group.pipe';


@NgModule({
  declarations: [
    GroupsChartsComponent,
    GroupsListComponent,
    GroupsContainerComponent,
    GroupsCardsComponent,
    GroupsOverviewComponent,
    SearchProjectOrGroupPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ChartsModule,
    FormsModule,
  ],
})
export class GroupsModule { }

