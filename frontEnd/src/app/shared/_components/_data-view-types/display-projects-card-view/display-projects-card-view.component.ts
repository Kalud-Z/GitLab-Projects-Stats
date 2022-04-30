import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { RoutingService } from '../../../_services/routing.service';
import { cardsTypeOptionsIDs } from "../../../../projects/_shared/_other/projects-shared-properties";
import { howFarWeGoBack } from "../../_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component";


@Component({
  selector: 'app-display-projects-card-view',
  templateUrl: './display-projects-card-view.component.html',
  styleUrls: ['./display-projects-card-view.component.scss'],
})

export class DisplayProjectsCardViewComponent implements OnInit , AfterViewChecked {
  @Input() set allProjectsSetter(projects: Project[]) {
    this.allProjectsUnfiltered = projects;
    this.allProjects = this.allProjectsUnfiltered;
  }
  @ViewChildren('finalProjectsToDisplay') finalProjectsToDisplay;

  // howFarWeGoBack = howFarWeGoBack;
  // howFarWeGoBack_text = Object.values(howFarWeGoBack);

  cardTypes = cardsTypeOptionsIDs
  allProjects: Project[];
  showProjectDetailsNow =  false;
  clickedProject: Project;
  shouldWeHideEmptyCards = false;

  closeGroupPanelContainer = false;

  howFarWeGoBackCurrentlySelected: howFarWeGoBack;

  private allProjectsUnfiltered: Project[];


  constructor(
    public synchUIService: SynchUIService,
    public routingService : RoutingService,
    private cdr: ChangeDetectorRef,
) { }



  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }


  ngOnInit(): void {
    // this.howFarWeGoBack_currentlySelected = howFarWeGoBack.LAST_30_DAYS;
    this.synchUIService.howFarWeGoBack$.subscribe(option => {
      this.howFarWeGoBackCurrentlySelected = option;
    })

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


  weAreInGroupsViewAndOnlyFewItemsDisplayed() {
    let targetLength: number;
    let onlyFewItemsDisplayed: boolean;

    if(this.finalProjectsToDisplay) { targetLength = this.finalProjectsToDisplay.length }
    else { targetLength = this.allProjects.length }

    onlyFewItemsDisplayed = targetLength <= 3;

    return this.areWeInGroupsView() && onlyFewItemsDisplayed
  }

}

