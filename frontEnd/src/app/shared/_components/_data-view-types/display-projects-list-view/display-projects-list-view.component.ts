import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../../../_models/project.model';
import { Subject } from 'rxjs';
import { formatTestCoverage } from '../../../_other/global-shared-methods';
import { RoutingService } from '../../../_services/routing.service';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { howFarWeGoBack } from '../../_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component';
import { LAST_PIPELINE_STATUS } from '../../last-pipeline-status/last-pipeline-status.component';


export enum TableColumnsNames  {
  TEST_COVERAGE = 'Test Coverage' ,
  TOTAL_PIPELINES = 'Total Pipelines' ,
  LAST_PIPELINE_DATE = 'Last Pipeline Date',
  LAST_PIPELINE_STATUS = 'Last Pipeline Status',
  PROJECT_NAME = 'Project Name',
  PIPELINES_AVG_DURATION = 'Pipelines Avg Duration',
  REPO_SIZE = 'Repo Size',
  ARTIFACTS_SIZE = 'Artifacts Size'
}

export enum PIPELINES_COLUMN_FILTER_OPTIONS {
  HIDE_PROJECTS_WITH_NO_PIPELINES = 'Hide projects with no pipelines',
  SHOW_ONLY_PROJECTS_WITH_NO_PIPELINES = 'Show only projects with no pipelines',
}

export enum TEST_COVERAGE_COLUMN_FILTER_OPTIONS {
  HIDE_PROJECTS_WITH_NO_TEST_COVERAGE = 'Hide projects with no test coverage',
  SHOW_ONLY_PROJECTS_WITH_NO_TEST_COVERAGE = 'Show only projects with no test coverage',
}


@Component({
  selector: 'app-display-projects-list-view',
  templateUrl: './display-projects-list-view.component.html',
  styleUrls: ['./display-projects-list-view.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class DisplayProjectsListViewComponent implements OnInit , OnDestroy {

  @Input() set allProjectsRawSetter(projects: Project[]) {
    this.allProjectsRaw = projects;
  }

  lastPipelineStatusFilter = {
    options: LAST_PIPELINE_STATUS,
    isShown: false,
    optionsSelected: [],
    isOn : false,
    setState: () => { this.lastPipelineStatusFilter.isOn = this.lastPipelineStatusFilter.optionsSelected.length > 0 },
    optionClicked: (option: LAST_PIPELINE_STATUS) => {
      const index = this.lastPipelineStatusFilter.optionsSelected.indexOf(option);
      if(index === -1) {
        this.lastPipelineStatusFilter.optionsSelected.push(option);
        this.lastPipelineStatusFilter.optionsSelected = [...this.lastPipelineStatusFilter.optionsSelected , ...[]];
      }
      else {
        this.lastPipelineStatusFilter.optionsSelected.splice(index , 1);
        this.lastPipelineStatusFilter.optionsSelected = [...this.lastPipelineStatusFilter.optionsSelected , ...[]];
      }
      this.lastPipelineStatusFilter.setState();
    },
    clear:() => {
      this.lastPipelineStatusFilter.optionsSelected = [];
      this.lastPipelineStatusFilter.setState();
    },
  }

  pipelinesColumnFilter = {
    allOptions: PIPELINES_COLUMN_FILTER_OPTIONS,
    isShown: false,
    optionSelected: null,
    isOn : false,
    setState: () => { this.pipelinesColumnFilter.isOn = !!this.pipelinesColumnFilter.optionSelected },
    optionClicked: (option: PIPELINES_COLUMN_FILTER_OPTIONS) => {
      if(this.pipelinesColumnFilter.optionSelected === option) { this.pipelinesColumnFilter.optionSelected = null}
      else { this.pipelinesColumnFilter.optionSelected = option }
      this.pipelinesColumnFilter.setState();
    },
    clear:() => {
      this.pipelinesColumnFilter.optionSelected = null;
      this.pipelinesColumnFilter.setState();
    }
  }

  testCoverageColumnFilter = {
    allOptions: TEST_COVERAGE_COLUMN_FILTER_OPTIONS,
    isShown: false,
    optionSelected: null,
    isOn : false,
    setState: () => { this.testCoverageColumnFilter.isOn = !!this.testCoverageColumnFilter.optionSelected },
    optionClicked: (option: TEST_COVERAGE_COLUMN_FILTER_OPTIONS) => {
      if(this.testCoverageColumnFilter.optionSelected === option) { this.testCoverageColumnFilter.optionSelected = null}
      else { this.testCoverageColumnFilter.optionSelected = option }
      this.testCoverageColumnFilter.setState();
    },
    clear:() => {
      this.testCoverageColumnFilter.optionSelected = null;
      this.testCoverageColumnFilter.setState();
    }
  }

  sortProjects = {
    columnSelected : TableColumnsNames.TOTAL_PIPELINES
  }

  TableColumnsNames = TableColumnsNames;

  allProjectsRaw: Project[];

  clickedProject: Project;
  showProjectDetailsNow = false;

  howFarWeGoBackCurrentlySelected: howFarWeGoBack;

  destroy$ = new Subject<void>();
  searchQuery: string[];

  private currentlySelectedColumns: TableColumnsNames[];

  constructor(
    public routingService : RoutingService,
    public synchUIService : SynchUIService,
  ) {}


  @HostListener('document:click', ['$event']) onClick(event) { // click outside filterBox to close it
    if(event.target.nodeName === 'use'  || event.target.nodeName === 'svg') { return }
    if( !(event.target.className.includes('filterOptions')
          || event.target.className.includes('pipelinesFilterOption')
          || event.target.className.includes('testCoverageFilterOption')
          || event.target.className.includes('option')
          || event.target.className.includes('clearButton')) ){
      this.lastPipelineStatusFilter.isShown = false;
      this.pipelinesColumnFilter.isShown = false;
      this.testCoverageColumnFilter.isShown = false;
    }
  }

  ngOnInit(): void {
    this.synchUIService.howFarWeGoBack$.subscribe(option => {
      this.howFarWeGoBackCurrentlySelected = option;
    });

    this.synchUIService.currentlySelectedColumns$.subscribe(columns => {
      this.currentlySelectedColumns = columns[0];
      // if(columns[1]) {  this.changeSortingColumnIfNecessary(columns[1]) }
    });

    this.synchUIService.tableListFilterByNameSearchQuery$.subscribe(query => {
      this.searchQuery = query;
    });

    this.synchUIService.reRunFilter();
    this.synchUIService.reRunSearchQuery$.next(true);
  } // ngOnInit

  goToRepo(project: Project) {
    this.routingService.goToRepo(project);
  }

  showProjectDetails(project : Project) {
    this.clickedProject = project;
    const numOfPipelines = project.stats.numberOfPipelines;
    if(numOfPipelines === 0) { this.showProjectDetailsNow = true }
    else { this.routingService.showProjectDetails(project.id) }
  }

  formatTestCoverageFN(testCoverage: number): string {
    return formatTestCoverage(testCoverage);
  }

  getLastPipelineDate(project: Project): string {
    if(project.pipelines?.length > 0) { return project.pipelines[0].stats.created_at }
    else { return '------' }
  }

  isThisColumnSelected(column: TableColumnsNames): boolean {
    const targetIndex = this.currentlySelectedColumns.indexOf(column);
    return targetIndex !== -1;
  }

  sortByColumnClicked(column: TableColumnsNames) {
    this.sortProjects.columnSelected = column;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

