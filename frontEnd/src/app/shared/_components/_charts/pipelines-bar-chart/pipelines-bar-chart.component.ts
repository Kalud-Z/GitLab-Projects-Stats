import { Component, Input} from '@angular/core';
import { Pipeline } from '../../../_models/pipeline.model';
import { animation, colors } from '../../../_other/global-shared-variables';
import { Easing } from 'chart.js';
import { ProjectsDataService } from '../../../../projects/_shared/_services/projects-data.service';
import { Project } from '../../../_models/project.model';
import * as Chart from 'chart.js';
import { getDeepCloneOf } from '../../../_other/global-shared-methods';
import { SynchUIService } from '../../../_services/synch-ui.service';

@Component({
  selector: 'app-pipelines-bar-chart',
  templateUrl: './pipelines-bar-chart.component.html',
  styleUrls: ['./pipelines-bar-chart.component.scss' , '../_shared/charts-shared.scss']
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelinesBarChartComponent  {
  isDataAvailable = false;
  clickedPipeline: Pipeline;

  finalProjectUsed: Project;
  projectObj: Project;

  numberOfPipelinesToWorkWith = 30;
  showChart = false;

  private pipelinesReversed: Pipeline[];

  @Input() set projectSetter(project: Project) {
    this.projectObj = project;
    this.finalProjectUsed = getDeepCloneOf(this.projectObj);
    this.pipelinesReversed = this.finalProjectUsed.pipelines.slice().reverse();

    this.fillPipelinesDurationsChartWithData();
    this.showChart = true;
  }


  pipelinesDurationsChart = {
    barChartOptions:  {
      hover: {
        onHover: function(e:any) {
          let point = this.getElementAtEvent(e);
          if(point.length) {e.target.style.cursor = 'pointer'}
          else {e.target.style.cursor = 'default'}
        }
      },
      responsive: true,
      animation : {
        duration : animation.duration,
        easing : animation.easing as Easing,   // TODO : why is this causin an error without the typecast ?
      },
      title : {
        text : 'Durations of Last 30 Build-Pipelines' ,
        display : true,
        fontSize: 17,
        padding: 14,
      },
      legend: {
        display: true,
        labels: {
          fontStyle: 'italic',
          fontColor: '#4c4747',
          fontSize : 12,
          generateLabels(chart: Chart): Chart.ChartLegendLabelItem[] {
            const testReportsLabel: Chart.ChartLegendLabelItem = {
              text : 'Test Reports Available',
              fillStyle: colors.chartBars.backgroundColor,
              strokeStyle : '#b35651',
              lineWidth : 3,
            };
            const pipelinesLabel: Chart.ChartLegendLabelItem = {
              text : 'Duration of Build-Pipeline (minutes)',
              fillStyle: colors.chartBars.backgroundColor,
              strokeStyle : 'yellow',
              lineWidth : 0,
              index : 0,
            };
            return [pipelinesLabel , testReportsLabel]
          },
        },
      },
      tooltips : {
        enabled : true,
        cornerRadius : 4,
        callbacks : {
          label(tooltipItem: Chart.ChartTooltipItem): string | string[] {
            return  '';
          },
        },
      },
      onClick(event?: MouseEvent, activeElements?: Array<any>): any {},
    },

    barChartLabels:  [],
    barChartType:  'bar',
    barChartLegend : true,
    barChartPlugins : [],

    barChartData: [],
  }

  pipelinesCreatedAtArray: string[] = [];
  pipelinesDurationsArray: number[] = [];
  pipelinesDurationsChartLabel = 'Duration of Build-Pipeline (minutes)';



  constructor(private projectsDataService: ProjectsDataService, private syncUIService: SynchUIService) {
  }


  private displayPipeline(clickedPipelineIndex: number) {
    // const pipelineID = this.finalProjectUsed.pipelines[clickedIndex].id;
    // this.clickedPipeline = this.projectsDataService.getPipelineByID(this.finalProjectUsed, pipelineID);

    // const clickedPipelineIndex = activeElements[0]._index;
    // this.syncUIService.detailsView.clickedTestReport$.next(.testReport);

    this.syncUIService.detailsView.clickedPipeline$.next(this.pipelinesReversed[clickedPipelineIndex]);
  }

  private fillPipelinesDurationsChartWithData() {
    // this.finalProjectUsed.pipelines = this.projectObj.pipelines.slice(0 , this.numberOfPipelinesToWorkWith);

    this.pipelinesReversed = this.pipelinesReversed.slice(0 , this.numberOfPipelinesToWorkWith);

    for (let i = 0 ; i <= this.pipelinesReversed.length - 1; i++) {
      if(this.pipelinesReversed[i]) {
        this.pipelinesDurationsArray.push(this.pipelinesReversed[i].stats.duration_inMinutes);
        this.pipelinesCreatedAtArray.push(this.pipelinesReversed[i].stats.created_at);
      }
    }

    this.pipelinesDurationsChart.barChartData = [
      {
        data: this.pipelinesDurationsArray,
        hoverBackgroundColor: colors.chartBars.hoverBackgroundColor,
        backgroundColor: colors.chartBars.backgroundColor,
        borderColor : '#b35651',
        borderWidth :  (ctx) => {
          let finalWidth: number;
          if(this.pipelinesReversed[ctx.dataIndex].stats.isTestReportAvailable) { finalWidth = 3 }
          else { finalWidth = 0 }
          return finalWidth;
        },
      },
    ]

    this.pipelinesDurationsChart.barChartLabels = this.pipelinesCreatedAtArray;

    this.pipelinesDurationsChart.barChartOptions.tooltips.callbacks.label = (tooltipItem: Chart.ChartTooltipItem): string => {
      let finalTextToDisplay: string;
      if(this.pipelinesReversed[tooltipItem.index].stats.isTestReportAvailable) {
        finalTextToDisplay = 'click the chart to see test Report'
      } else { finalTextToDisplay = 'Duration of Build Pipeline : ' + tooltipItem.value + ' minutes' }
      return  `${finalTextToDisplay} | Pipeline-ID : ${this.pipelinesReversed[tooltipItem.index].id} `  ;
    }

    this.pipelinesDurationsChart.barChartOptions.onClick = (event?: MouseEvent, activeElements?: Array<any>) => {
      if(activeElements.length !== 0) {
        const clickedPipelineIndex = activeElements[0]._index;
        this.displayPipeline(clickedPipelineIndex);
      }
    }
  } // endOfMethod




} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
