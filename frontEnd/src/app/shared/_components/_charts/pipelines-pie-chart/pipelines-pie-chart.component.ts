import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { Easing } from 'chart.js';
import { animation, pipelineStateColors } from '../../../_other/global-shared-variables';

@Component({
  selector: 'app-pipelines-pie-chart',
  templateUrl: './pipelines-pie-chart.component.html',
  styleUrls: ['./pipelines-pie-chart.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelinesPieChartComponent implements OnInit { // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  @Input() projectObj: Project;

  successRatioChart = {
    pieChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      animation : {
        duration : animation.duration,
        easing : animation.easing as Easing,
      },
    },
    pieChartLabels: ['Sucessful Pipelines' , 'Failed Pipelines' , 'Canceled Pipelines' , 'Skipped Pipelines' , 'Running Pipelines' ],
    pieChartType:  'pie',
    pieChartLegend: true,
    pieChartPlugins: [],
    pieChartDataSets: [],
  }


  constructor() { }

  ngOnInit(): void {
    this.fillSuccessRatioChartWithData();
  }



  private fillSuccessRatioChartWithData() {
    this.successRatioChart.pieChartDataSets = [
      { data :
          [
            this.projectObj.stats.numberOfSuccessfulPipelines,
            this.projectObj.stats.numberOfFailedPipelines,
            this.projectObj.stats.numberOfCanceledPipelines,
            this.projectObj.stats.numberOfSkippedPipelines,
            this.projectObj.stats.numberOfRunningPipelines,
          ],

        backgroundColor: [
          pipelineStateColors.successful,
          pipelineStateColors.failed,
          pipelineStateColors.canceled,
          pipelineStateColors.skipped,
          pipelineStateColors.running],
      },
    ];
  }  // end of method

}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
