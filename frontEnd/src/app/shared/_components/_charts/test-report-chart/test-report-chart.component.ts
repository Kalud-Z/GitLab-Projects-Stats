import { Component, Input } from '@angular/core';
import { Project } from "../../../_models/project.model";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import * as _ from 'lodash';
import { pipelineStateColors } from '../../../_other/global-shared-variables';
import { TestReport } from '../../../_models/test-report.model';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { ProjectsDataService } from '../../../../projects/_shared/_services/projects-data.service';
import { Pipeline } from '../../../_models/pipeline.model';
import { getDeepCloneOf } from '../../../_other/global-shared-methods';


@Component({
  selector: 'app-test-report-chart',
  templateUrl: './test-report-chart.component.html',
  styleUrls: ['./test-report-chart.component.scss' , '../_shared/charts-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestReportChartComponent  {
  projectObj : Project;
  showChart =  true;
  numberOfPipelinesToWorkWith = 30;

  finalProjectUsed: Project;

  errorCount    : ChartDataSets;
  failedCount   : ChartDataSets;
  skippedCount  : ChartDataSets;
  successCount  : ChartDataSets;

  clickedTestReport: TestReport;
  pipelinesReversed: Pipeline[];
  pipelinesDisplayedInChart: Pipeline[] = [];


  @Input() set projectSetter(project: Project) {
    this.projectObj = project;
    this.finalProjectUsed = getDeepCloneOf(this.projectObj);
    this.pipelinesReversed = this.finalProjectUsed.pipelines.slice().reverse();

    this.initializeData();
    this.fillTestReportChartWithData()
    this.refreshTheChart();
    this.showChart = true;
  }


  pipelinesCreatedAtArray: string[] = [];
  pipelinesIDs: string[] = [];

  public barChartData: ChartDataSets[] = [];

  public barChartLabels: Label[] = [];

  public barChartOptions: ChartOptions = {
    hover: {
      onHover: function(e:any) {
        let point = this.getElementAtEvent(e);
        if(point.length) {e.target.style.cursor = 'pointer'}
        else {e.target.style.cursor = 'default'}
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes : [
        { stacked : true },
      ],
      xAxes : [
        { stacked : true },
      ],
    },
    onClick(event?: MouseEvent, activeElements?: Array<any>): any {},
  };

  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';


  constructor(private projectsDataService: ProjectsDataService, private syncUIService: SynchUIService) {}


  private fillTestReportChartWithData() {
    for (let i = 0;  i <= this.pipelinesReversed.length -1 ; i++) {
      if(this.pipelinesReversed[i]) {
        if(this.pipelinesReversed[i].testReport?.total_count > 0) {
          this.pipelinesDisplayedInChart.push(this.pipelinesReversed[i]);
          this.pipelinesCreatedAtArray.push(this.pipelinesReversed[i].stats.created_at);
          this.pipelinesIDs.push(this.pipelinesReversed[i].id.toString());
          this.errorCount.data.push(this.pipelinesReversed[i].testReport.error_count);
          this.successCount.data.push(this.pipelinesReversed[i].testReport.success_count);
          this.failedCount.data.push(this.pipelinesReversed[i].testReport.failed_count);
          this.skippedCount.data.push(this.pipelinesReversed[i].testReport.skipped_count);
        }
      }
    }

    this.barChartOptions.onClick = (event?: MouseEvent, activeElements?: Array<any>) => {
      if(activeElements.length !== 0) {
        const clickedPipelineIndex = activeElements[0]._index;
        this.syncUIService.detailsView.clickedTestReport$.next(this.pipelinesDisplayedInChart[clickedPipelineIndex].testReport);
      }
    }

  } // endOfMethod



  private refreshTheChart() {
    this.barChartLabels = this.pipelinesCreatedAtArray;
    // this.barChartLabels = this.pipelinesIDs;
    this.barChartData.push(this.errorCount);
    this.barChartData.push(this.successCount);
    this.barChartData.push(this.failedCount);
    this.barChartData.push(this.skippedCount);
  }


  private initializeData() {
    this.errorCount = {
      data: [],
      label: 'error-count ',
      backgroundColor : pipelineStateColors.failed,  // red
      hoverBackgroundColor: pipelineStateColors.failed,
    }


    this.failedCount  =  {
      data: [],
      label: 'failed-count ',
      backgroundColor : pipelineStateColors.canceled,  // 'grey',
      hoverBackgroundColor: pipelineStateColors.canceled,

    }

    this.skippedCount = {
      data: [],
      label: 'skipped-count ',
      backgroundColor :  pipelineStateColors.skipped,  // 'yellow',
      hoverBackgroundColor: pipelineStateColors.skipped,

    }


    this.successCount  =  {
      data: [],
      label: 'success-count ',
      backgroundColor : pipelineStateColors.successful, // 'green'
      hoverBackgroundColor: pipelineStateColors.successful,
    }
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
