import { Component, Input } from '@angular/core';
import { Project } from "../../../_models/project.model";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: 'app-test-coverage-chart',
  templateUrl:  './test-coverage-chart.component.html',
  styleUrls: ['./test-coverage-chart.component.scss' , '../_shared/charts-shared.scss' ],
})


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestCoverageChartComponent  {
  projectObj : Project;
  howManyPipelines = 50;


  @Input() set projectSetter(project: Project) {
    this.projectObj = project;

    this.fillTestCoverageChartWithData()
    this.refreshTheChart();
  }


  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Test Coverage trend (in %)',
      backgroundColor : 'rgb(255, 255, 153 , 0.4)',
    },

  ];

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
  };

  public barChartPlugins = [];
  public barChartLegend = true;
  public barChartType: ChartType = 'line';


  testCoverageArray: number[] = [];
  pipelinesIDsArray: string[] = [];
  pipelinesCreatedAtArray: string[] = [];



  private fillTestCoverageChartWithData() {
    for(let i = this.projectObj.pipelines.length - 1; i >= 0; i--) { // this is where , we reverse the date order .. => left -> right : old -> newest
      if(this.projectObj.pipelines[i].stats.testCoverage) { // if test coverage is null , we dont consider it.
        this.testCoverageArray.push(this.projectObj.pipelines[i].stats.testCoverage);
        this.pipelinesIDsArray.push(this.projectObj.pipelines[i].id.toString());
        this.pipelinesCreatedAtArray.push(this.projectObj.pipelines[i].stats.created_at);
      }
    }
  } // endOfMethod



  private refreshTheChart() {
    this.barChartLabels = this.pipelinesCreatedAtArray;
    this.barChartData[0].data = this.testCoverageArray;
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
