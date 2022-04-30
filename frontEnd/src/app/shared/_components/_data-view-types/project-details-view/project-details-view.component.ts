import { Component, OnInit } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { Pipeline } from '../../../_models/pipeline.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectsDataService } from '../../../../projects/_shared/_services/projects-data.service';
import { RoutingService } from '../../../_services/routing.service';
import { ChartsTypes } from '../../../../projects/_shared/_other/projects-shared-properties';
import { SynchUIService } from '../../../_services/synch-ui.service';


@Component({
  selector: 'app-project-details-view',
  templateUrl: './project-details-view.component.html',
  styleUrls: ['./project-details-view.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectDetailsViewComponent implements OnInit {
  projectObj: Project;
  isDataAvailable = false;
  clickedPipeline: Pipeline;

  ChartsTypes = ChartsTypes;
  selectedChartType: ChartsTypes = ChartsTypes.TestReports;
  isDataAvailableForSelectedChartType =  true;

  private currentID: number;

  constructor(private route: ActivatedRoute,
              private projectsDataService: ProjectsDataService,
              private syncUIService: SynchUIService,
              public routingService : RoutingService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params.id) {
        this.currentID = +params.id;
        this.getProjectObj();
        this.isDataAvailable = true;
      }
    });
    this.onChangeChartType(this.selectedChartType);
    this.syncUIService.detailsView.clickedPipeline$.subscribe(pipeline => this.clickedPipeline = pipeline)
  }  // ngOninit

  goToRepo() {
    this.routingService.goToRepo(this.projectObj);
  }

  private getProjectObj() {
    this.projectObj = this.projectsDataService.getProjectByID(this.currentID);
  }

  onChangeChartType(chartType: ChartsTypes) {
    if(chartType === ChartsTypes.Pipelines) {
      this.selectedChartType = ChartsTypes.Pipelines;
      this.isDataAvailableForSelectedChartType = !(this.projectObj.stats.numberOfPipelines === 0);
    }

    if(chartType === ChartsTypes.TestCoverage) {
      this.selectedChartType = ChartsTypes.TestCoverage;
      this.isDataAvailableForSelectedChartType = this.projectObj.stats.areTestCoveragesAvailable;
    }

    if(chartType === ChartsTypes.TestReports) {
      this.selectedChartType = ChartsTypes.TestReports;
      this.isDataAvailableForSelectedChartType = this.projectObj.stats.areTestsAvailable;
    }
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

