import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsContainerComponent } from './groups/groups-container/groups-container.component';
import { GroupsChartsComponent } from './groups/groups-container/groups-charts/groups-charts.component';
import { GroupsListComponent } from './groups/groups-container/groups-list/groups-list.component';
import { ProjectsContainerComponent } from './projects/projects-container/projects-container.component';
import { ProjectsChartsComponent } from './projects/projects-container/projects-charts/projects-charts.component';
import { ProjectsListComponent } from './projects/projects-container/projects-list/projects-list.component';
import { ProjectsCardsComponent } from './projects/projects-container/projects-cards/projects-cards.component';
import { GroupsCardsComponent } from './groups/groups-container/groups-cards/groups-cards.component';
import { GroupsOverviewComponent } from './groups/groups-container/groups-overview/groups-overview.component';
import { ProjectDetailsViewComponent } from "./shared/_components/_data-view-types/project-details-view/project-details-view.component";
import { ProjectsDashboardComponent } from './projects/projects-container/projects-dashboard/projects-dashboard.component';


// guard the 'list' path. you get to it only after passing through 'stats' ...
const appRoutes: Routes = [
  { path: '', redirectTo: 'groups/overview', pathMatch: 'full' },

  { path: 'groups', component : GroupsContainerComponent , data: { mainRouteAnimation: 'groupsView' } , children : [
      {path: '', redirectTo: 'overview', pathMatch: 'full' },
      {path : 'overview' , component : GroupsOverviewComponent},
      {path : 'charts/:id' , component : GroupsChartsComponent , data: { viewTabsRouteAnimation: 'chartsView' } },
      {path : 'cards/:id' , component : GroupsCardsComponent , data: { viewTabsRouteAnimation: 'cardsView' } },
      {path : 'list/:id' , component : GroupsListComponent , data: { viewTabsRouteAnimation: 'listView' } },
      {path : 'details/:id' , component : ProjectDetailsViewComponent},

    ]},
  { path: 'projects', component : ProjectsContainerComponent , data: { mainRouteAnimation: 'projectsView' } , children : [
      {path : '' , redirectTo: 'list', pathMatch: 'full' },
      {path : 'charts' , component : ProjectsChartsComponent , data: { viewTabsRouteAnimation: 'chartsView' } },
      {path : 'cards' , component : ProjectsCardsComponent , data: { viewTabsRouteAnimation: 'cardsView' } },
      {path : 'dashboard' , component : ProjectsDashboardComponent , data: { viewTabsRouteAnimation: 'dashboardView' } },
      {path : 'list' , component : ProjectsListComponent ,  data: { viewTabsRouteAnimation: 'listView' } },
      {path : 'details/:id' , component : ProjectDetailsViewComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
