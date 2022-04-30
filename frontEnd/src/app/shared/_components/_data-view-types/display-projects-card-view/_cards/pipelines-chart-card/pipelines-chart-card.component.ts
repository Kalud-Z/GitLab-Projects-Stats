import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../../../../../_models/project.model";
import { RoutingService } from "../../../../../_services/routing.service";
import { ProjectsSharedMethods } from "../../../../../../projects/_shared/_other/projects-shared-methods";
import { SynchUIService } from "../../../../../_services/synch-ui.service";
import {  howFarWeGoBack,  getNumberOfHowFarWeGoBack } from "../../../../_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component";

@Component({
  selector: 'app-pipelines-chart-card',
  templateUrl: './pipelines-chart-card.component.html',
  styleUrls: ['./pipelines-chart-card.component.scss' , '../_shared/cards-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelinesChartCardComponent implements OnInit {
  @Input() project: Project;
  private howFarWeGoBackOptionSelected: howFarWeGoBack;


  constructor(private routingService: RoutingService, private synchUIService: SynchUIService) { }

  ngOnInit(): void {
    this.synchUIService.howFarWeGoBack$.subscribe(option => {
      this.howFarWeGoBackOptionSelected = option;
    })
  }


  goToRepo(event , project: Project) {
    event.stopPropagation();
    this.routingService.goToRepo(project);
  }


  getAveragePipelinesDuration(project: Project) {
    return ProjectsSharedMethods.getNumberOfPipelinesInLastXXXDays(project , getNumberOfHowFarWeGoBack(this.howFarWeGoBackOptionSelected))[2]
  }

  getNumberOfTestReports(project: Project) {
    return ProjectsSharedMethods.getNumberOfTestReportsInLastXXXDays(project , getNumberOfHowFarWeGoBack(this.howFarWeGoBackOptionSelected))
  }


} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
