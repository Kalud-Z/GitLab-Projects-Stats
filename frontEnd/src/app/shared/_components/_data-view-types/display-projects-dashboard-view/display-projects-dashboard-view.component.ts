import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { howFarWeGoBack } from '../../_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component';
import { RoutingService } from '../../../_services/routing.service';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { formatTestCoverage } from '../../../_other/global-shared-methods';
import { cardsTypeOptionsIDs } from '../../../../projects/_shared/_other/projects-shared-properties';
import { sortByOptions } from '../../_dropdown-menus/sort-dashboard-dropdown/sort-dashboard-dropdown.component';

@Component({
  selector: 'app-display-projects-dashboard-view',
  templateUrl: './display-projects-dashboard-view.component.html',
  styleUrls: ['./display-projects-dashboard-view.component.scss'],
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class DisplayProjectsDashboardViewComponent implements OnInit {
  allProjects: Project[];
  showProjectDetailsNow =  false;
  clickedProject: Project;
  shouldWeHideEmptyCards = false;
  sortByOption: sortByOptions;
  closeGroupPanelContainer = false;
  howFarWeGoBackCurrentlySelected: howFarWeGoBack;
  cardTypes = cardsTypeOptionsIDs;

  private allProjectsUnfiltered: Project[];

  @Input() set allProjectsSetter(projects: Project[]) {
    this.allProjectsUnfiltered = projects;
    this.allProjects = this.allProjectsUnfiltered;
  }

  constructor(public synchUIService: SynchUIService, public routingService : RoutingService) {}

  ngOnInit(): void {
    this.synchUIService.howFarWeGoBack$.subscribe(option => {
      this.howFarWeGoBackCurrentlySelected = option;
    });

    this.synchUIService.dashboardView.sortBy$.subscribe(option => {
      this.sortByOption = option;
    });

    this.synchUIService.reRunFilter();
    this.synchUIService.reRunSearchQuery$.next(true);
  }

  goToRepo(event , project: Project) {
    event.stopPropagation();
    this.routingService.goToRepo(project);
  }

  showDetails(project: Project)  {
    this.clickedProject = project;
    const numOfPipelines = project.stats.numberOfPipelines;
    if(numOfPipelines === 0) { this.showProjectDetailsNow = true }
    else { this.routingService.showProjectDetails(project.id) }
  }


  areWeInGroupsView() {
    const currentURL = this.routingService.getCurrentURL();
    return currentURL.includes('groups');
  }


  getTestCoverage(project: Project) {
    return formatTestCoverage(project.stats.testCoverage)
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
