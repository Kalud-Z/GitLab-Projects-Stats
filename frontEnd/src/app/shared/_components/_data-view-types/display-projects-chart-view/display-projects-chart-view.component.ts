import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataInterface } from '../../../_interfaces/chart-data.interface';
import { Label } from 'ng2-charts';
import { Project } from '../../../_models/project.model';
import { OrderByOption } from '../../../_interfaces/dropdown-menu-option.interface';
import { ChartDataSets, ChartOptions, ChartType, Easing } from 'chart.js';
import { Subject } from 'rxjs';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { FetchDataService } from '../../../_services/fetch-data.service';
import { Context } from 'chartjs-plugin-datalabels';
import { ProjectsSharedProperties } from '../../../../projects/_shared/_other/projects-shared-properties';
import { takeUntil } from 'rxjs/operators';
import { RoutingService } from '../../../_services/routing.service';
import { animation, colors } from '../../../_other/global-shared-variables';

type arrayOfObjectsOfAnyTypeOfDisplayedData = PipelineObject[] | AvgDurationObject[] | TestReportObject[] ;

interface PipelineObject {
  projectName: string,
  numOfPipelines : number,
}

interface AvgDurationObject {
  projectName: string,
  avgDuration : number,
}

interface TestReportObject {
  projectName: string,
  numOfTestReports : number
}


interface  PipelineObjectsArray {
  raw: PipelineObject[],
  filtered: PipelineObject[],
  currentlyUsed: PipelineObject[]
}


interface  TestReportObjectsArray {
  raw: TestReportObject[],
  filtered: TestReportObject[],
  currentlyUsed: TestReportObject[]
}


interface  AvgDurationObjectsArray {
  raw: AvgDurationObject[],
  filtered: AvgDurationObject[],
  currentlyUsed: AvgDurationObject[]
}




interface DisplayedDataObject {
  labels : string[],
  values : number[],
  title  : string
}

class CurrentlyDisplayedData {
  constructor(
    public chartData : ChartDataInterface,
    public chartLabels : Label[],
  ) {}
}

const initialChartHeightInProjectsView  = 240;
const initialChartHeightInGroupsView    = 140;


@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-display-projects-chart-view',
  templateUrl: './display-projects-chart-view.component.html',
  styleUrls: ['./display-projects-chart-view.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class DisplayProjectsChartViewComponent implements OnInit , OnDestroy {

  @Input() set allProjectsSetter(projects: Project[]) {
    this.synchUIService.chartOrderBy$.subscribe(option => {
      this.selectedOrderByOption = option;
      if(this.renderNow) {  // first time we get here we dont go inside.
        this.disableFilter();
        this.useRawData();
        this.createCurrentlySelectedData();
        this.changeTheChart();
        // this.cdr.detectChanges();
      }
    });


    this.resetObjectArray_raw();

    this.allProjects = projects;

    this.createAllTypesOfObjectsArrays()
    this.useRawData();
    this.createAllTypesOfDisplayedObjects();
    this.createCurrentlySelectedData();
    this.changeTheChart();
    this.renderNow = true;
  }
  allProjects: Project[];

  showLoadingSpinner = false;
  renderNow = false;
  chartHeight: number
  selectedOrderByOption: OrderByOption;

  currentlyDisplayDataObject : CurrentlyDisplayedData;

  pipelineObjectsArray: PipelineObjectsArray = {
    raw : [],
    filtered : [],
    currentlyUsed : [],
  }

  testReportObjectsArray: TestReportObjectsArray = {
    raw : [],
    filtered : [],
    currentlyUsed : [],
  }

  avgDurationObjectsArray: AvgDurationObjectsArray = {
    raw : [],
    filtered : [],
    currentlyUsed : [],
  }


  pipelinesReadyToDisplayData    : Partial<DisplayedDataObject>   = {} ;
  testReportsReadyToDisplayData  : Partial<DisplayedDataObject>   = {} ;
  avgDurationsReadyToDisplayData : Partial<DisplayedDataObject>   = {} ;


  projectsDataArray : ChartDataInterface[];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation : {
      duration : animation.duration,
      easing : animation.easing as Easing,
    },

    scales: {
      xAxes: [{
        ticks: { suggestedMax: 200 },
      }],
    },

    plugins: {
      datalabels: {
        color: colors.dataLabels.color,
        anchor : 'end',
        align : 'end',
        textStrokeWidth : 1,
        display : (context) => {
          return this.hideDataLabelsIfNull(context)
        },
      },
    },

  };
  barChartLabels: Label[];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[];

  destroy$ = new Subject<void>();

  constructor(
    private routingService: RoutingService,
    private dataCrudService : FetchDataService,
    private synchUIService : SynchUIService,
  ) { }


  @HostListener('document:keydown.shift.f', ['$event']) handleKeyboardEvent() {
      this.setHeightTo100()
  }



  ngOnInit(): void {
    this.setInitialChartHeight();

    this.synchUIService.removeEmptyEntries$.pipe(takeUntil(this.destroy$)).subscribe(flag => {
      if(flag) { this.removeEmptyEntries() }  else { this.disableFilter() }
    });
    this.synchUIService.showOnlyEmptyEntries$.subscribe(flag => { if(flag) { this.showOnlyEmptyEntries() }  else { this.disableFilter() } });
  }// ngOnInit

  increaseChartSize() {
    if(this.chartHeight < 300) { this.chartHeight += 20 }
  }

  decreaseChartSize() {
    if(this.chartHeight > 100) { this.chartHeight -= 20; }
  }

  determineChartSize(): string {
    let returnedClass: string;
    if (this.chartHeight === 100) { returnedClass = 'chartWrapper-Height100' }
    if (this.chartHeight === 120) { returnedClass = 'chartWrapper-Height120' }
    if (this.chartHeight === 140) { returnedClass = 'chartWrapper-Height140' }
    if (this.chartHeight === 160) { returnedClass = 'chartWrapper-Height160' }
    if (this.chartHeight === 180) { returnedClass = 'chartWrapper-Height180' }
    if (this.chartHeight === 200) { returnedClass = 'chartWrapper-Height200' }
    if (this.chartHeight === 220) { returnedClass = 'chartWrapper-Height220' }
    if (this.chartHeight === 240) { returnedClass = 'chartWrapper-Height240' }
    if (this.chartHeight === 260) { returnedClass = 'chartWrapper-Height260' }
    if (this.chartHeight === 280) { returnedClass = 'chartWrapper-Height280' }
    if (this.chartHeight === 300) { returnedClass = 'chartWrapper-Height300' }

    return returnedClass;
  }



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }


  setHeightTo100() {
    this.chartHeight = 100;
  }



  // Chart_style stuff  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  private setInitialChartHeight() {
    if(this.routingService.areInProjectsView())       { this.chartHeight = initialChartHeightInProjectsView }
    else if(this.routingService.areWeInGroupsView())  { this.chartHeight = initialChartHeightInGroupsView }
  }

  private hideDataLabelsIfNull(context: Context): boolean {
    const indexesOfEmptyEntries = this.getIndexesOfEmptyEntries()
    return indexesOfEmptyEntries.indexOf(context.dataIndex) === -1;
  }

  private adjustXAxisMaxValue() {
    const maxValue = Math.max(...(this.currentlyDisplayDataObject.chartData.data));
    const tenPercent = +((maxValue * 10) / 100).toFixed(0);
    const finalValue = maxValue + tenPercent;
    this.barChartOptions.scales.xAxes[0].ticks.suggestedMax = finalValue ;
  }

  private adjustBackgroundColorOfChartData() {
    this.barChartData = [
      {
        ...this.barChartData[0],
        backgroundColor : colors.chartBars.backgroundColor,
        hoverBackgroundColor: colors.chartBars.hoverBackgroundColor,
        maxBarThickness: 50,
        minBarLength : 2,
      },
    ]
  }

//    Chart_Data stuff    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  private changeTheChart() {
    this.barChartData = [ this.currentlyDisplayDataObject.chartData ];
    this.barChartLabels = this.currentlyDisplayDataObject.chartLabels;
    this.adjustBackgroundColorOfChartData();

    this.adjustXAxisMaxValue();
  }

  private createAllTypesOfObjectsArrays() {
    this.allProjects.forEach(project => {
      const pipelinesTempObj:PipelineObject = {projectName : project.name , numOfPipelines : project.stats.numberOfPipelines};
      this.pipelineObjectsArray.raw.push(pipelinesTempObj);

      const avgDurationTempObj: AvgDurationObject = {projectName : project.name , avgDuration : project.stats.averageDurationOfPipelines_inMinutes};
      this.avgDurationObjectsArray.raw.push(avgDurationTempObj);

      const testReportsTempObj: TestReportObject = {projectName : project.name , numOfTestReports : project.stats.numberOfTestReports };
      this.testReportObjectsArray.raw.push(testReportsTempObj);
    });

    this.pipelineObjectsArray.raw     = (this.orderDescending(this.pipelineObjectsArray.raw) as PipelineObject[]);
    this.avgDurationObjectsArray.raw  = (this.orderDescending(this.avgDurationObjectsArray.raw) as AvgDurationObject[]);
    this.testReportObjectsArray.raw   = (this.orderDescending(this.testReportObjectsArray.raw) as TestReportObject[]);
  }

  private createAllTypesOfDisplayedObjects() {
    ProjectsSharedProperties.orderByOptions.forEach(option => {
      if(option.id === "pipelines") {
        this.pipelinesReadyToDisplayData.title = option.id;
        this.pipelinesReadyToDisplayData.labels = this.getProjectsNames(this.pipelineObjectsArray.currentlyUsed);
        this.pipelinesReadyToDisplayData.values = this.getPipelineValues(this.pipelineObjectsArray.currentlyUsed);
      }

      if(option.id === "testReports") {
        this.testReportsReadyToDisplayData.title = option.id;
        this.testReportsReadyToDisplayData.labels = this.getProjectsNames(this.testReportObjectsArray.currentlyUsed);
        this.testReportsReadyToDisplayData.values = this.getTestReportValues(this.testReportObjectsArray.currentlyUsed);
      }

      if(option.id === "avgDuration") {
        this.avgDurationsReadyToDisplayData.title = option.id;
        this.avgDurationsReadyToDisplayData.labels = this.getProjectsNames(this.avgDurationObjectsArray.currentlyUsed);
        this.avgDurationsReadyToDisplayData.values = this.getAvgDurationValues(this.avgDurationObjectsArray.currentlyUsed);
      }
    });
  }

  private getProjectsNames(arrayOfObjects: arrayOfObjectsOfAnyTypeOfDisplayedData): string[] {
    const finalArray: string[] = [];
    arrayOfObjects.forEach(obj => { finalArray.push(obj.projectName) });
    return finalArray;
  }

  private getPipelineValues(pipelineObjectsArrayCurrentlyUsed: PipelineObject[]): number[] {
    const finalArrayOfValues: number[] = [];
    pipelineObjectsArrayCurrentlyUsed.forEach(obj => {
      finalArrayOfValues.push(obj.numOfPipelines);
    });
    return  finalArrayOfValues;
  }

  private getTestReportValues(testReportObjectsArrayCurrentlyUsed: TestReportObject[]): number[] {
    const finalArrayOfValues: number[] = [];
    testReportObjectsArrayCurrentlyUsed.forEach(obj => {
      finalArrayOfValues.push(obj.numOfTestReports);
    });
    return  finalArrayOfValues;
  }

  private getAvgDurationValues(avgDurationObjectsArrayCurrentlyUsed: AvgDurationObject[]): number[] {
    const finalArrayOfValues: number[] = [];
    avgDurationObjectsArrayCurrentlyUsed.forEach(obj => {
      finalArrayOfValues.push(obj.avgDuration);
    });
    return  finalArrayOfValues;
  }

  private createCurrentlySelectedData() {
    let tempObject : CurrentlyDisplayedData;

    if(this.selectedOrderByOption.id === "pipelines") {
      tempObject = new CurrentlyDisplayedData(
        { data :  this.pipelinesReadyToDisplayData.values, label : this.pipelinesReadyToDisplayData.title } ,
        this.pipelinesReadyToDisplayData.labels,
      );
    }

    if(this.selectedOrderByOption.id === "testReports") {
      tempObject = new CurrentlyDisplayedData(
        { data :  this.testReportsReadyToDisplayData.values, label : this.testReportsReadyToDisplayData.title } ,
        this.testReportsReadyToDisplayData.labels,
      );
    }

    if(this.selectedOrderByOption.id === "avgDuration") {
      tempObject = new CurrentlyDisplayedData(
        { data :  this.avgDurationsReadyToDisplayData.values, label : this.avgDurationsReadyToDisplayData.title } ,
        this.avgDurationsReadyToDisplayData.labels,
      );
    }
    this.currentlyDisplayDataObject = tempObject;
  }

  private useRawData() {
    this.pipelineObjectsArray.currentlyUsed      = this.pipelineObjectsArray.raw;
    this.testReportObjectsArray.currentlyUsed    = this.testReportObjectsArray.raw;
    this.avgDurationObjectsArray.currentlyUsed   = this.avgDurationObjectsArray.raw;
  }

  private orderDescending(targetArray: arrayOfObjectsOfAnyTypeOfDisplayedData): arrayOfObjectsOfAnyTypeOfDisplayedData {
    let compare = (a:any , b:any) => { return null }

    if(targetArray[0].hasOwnProperty('numOfPipelines')){
      compare = (a:PipelineObject , b:PipelineObject) => { return b.numOfPipelines - a.numOfPipelines }
    }

    if(targetArray[0].hasOwnProperty('avgDuration')){
      compare = (a: AvgDurationObject , b: AvgDurationObject) => { return b.avgDuration - a.avgDuration }
    }

    if(targetArray[0].hasOwnProperty('numOfTestReports')){
      compare = (a: TestReportObject , b: TestReportObject) => { return b.numOfTestReports - a.numOfTestReports }
    }

    return targetArray.sort(compare);
  }


  // Filter stuff %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  private removeEmptyEntries() {
    this.pipelineObjectsArray.raw.forEach(obj => {
      if(obj.numOfPipelines > 0) { this.pipelineObjectsArray.filtered.push(obj) }
    });

    this.testReportObjectsArray.raw.forEach(obj => {
      if(obj.numOfTestReports > 0) { this.testReportObjectsArray.filtered.push(obj) }
    });

    this.avgDurationObjectsArray.raw.forEach(obj => {
      if(obj.avgDuration > 0) { this.avgDurationObjectsArray.filtered.push(obj) }
    });

    this.useFilteredData();
    this.createAllTypesOfDisplayedObjects();
    this.createCurrentlySelectedData();
    this.changeTheChart();
    this.chartHeight = 100;
  }

  private showOnlyEmptyEntries() {
    this.pipelineObjectsArray.raw.forEach(obj => {
      if(obj.numOfPipelines === 0) { this.pipelineObjectsArray.filtered.push(obj) }
    });

    this.testReportObjectsArray.raw.forEach(obj => {
      if(obj.numOfTestReports === 0) { this.testReportObjectsArray.filtered.push(obj) }
    });

    this.avgDurationObjectsArray.raw.forEach(obj => {
      if(obj.avgDuration === 0) { this.avgDurationObjectsArray.filtered.push(obj) }
    });

    this.useFilteredData();
    this.createAllTypesOfDisplayedObjects();
    this.createCurrentlySelectedData();
    this.changeTheChart();
  }

  private disableFilter() {
    this.resetFilteredData();
    this.useRawData();
    this.createAllTypesOfDisplayedObjects();
    this.createCurrentlySelectedData();
    this.changeTheChart();
    this.setInitialChartHeight();
  }

  private useFilteredData() {
    this.pipelineObjectsArray.currentlyUsed      = this.pipelineObjectsArray.filtered;
    this.testReportObjectsArray.currentlyUsed    = this.testReportObjectsArray.filtered;
    this.avgDurationObjectsArray.currentlyUsed   = this.avgDurationObjectsArray.filtered;
  }

  private resetFilteredData() {
    this.pipelineObjectsArray.filtered           = [];
    this.testReportObjectsArray.filtered         = [];
    this.avgDurationObjectsArray.filtered        = [];
  }

  private getIndexesOfEmptyEntries(): number[] {
    const finalArray: number[] = []
    this.currentlyDisplayDataObject.chartData.data.forEach((num , index) => {
      if(num === 0) { finalArray.push(index) }
    });
    return finalArray;
  }



  private resetObjectArray_raw() {
    this.pipelineObjectsArray.raw     = [];
    this.avgDurationObjectsArray.raw  = [];
    this.testReportObjectsArray.raw   = [];
  }



} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


