import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsContainerComponent } from './projects-container/projects-container.component';
import { ProjectsChartsComponent } from './projects-container/projects-charts/projects-charts.component';
import { ProjectsListComponent } from './projects-container/projects-list/projects-list.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { ProgressBarModule } from "angular-progress-bar";
import { ProjectsCardsComponent } from './projects-container/projects-cards/projects-cards.component'
// import { TooltipModule } from 'ng2-tooltip-directive';
import { ProjectsDashboardComponent } from './projects-container/projects-dashboard/projects-dashboard.component';



@NgModule({
    declarations: [
      ProjectsContainerComponent,
      ProjectsChartsComponent,
      ProjectsListComponent,
      ProjectsCardsComponent,
      ProjectsDashboardComponent,
    ],
    exports: [
        ProjectsChartsComponent,
        ProjectsListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ChartsModule,
        ProgressBarModule,
        // TooltipModule,
    ],
})
export class ProjectsModule { }
