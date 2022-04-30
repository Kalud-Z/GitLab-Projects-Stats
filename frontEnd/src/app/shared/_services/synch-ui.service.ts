import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CardsTypeOption, OrderByOption } from '../_interfaces/dropdown-menu-option.interface';
import { ProjectsSharedProperties } from '../../projects/_shared/_other/projects-shared-properties';
import { TableColumnsNames } from '../_components/_data-view-types/display-projects-list-view/display-projects-list-view.component';
import { howFarWeGoBack } from "../_components/_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component";
import { Pipeline } from '../_models/pipeline.model';
import { TestReport } from '../_models/test-report.model';
import { sortByOptions } from '../_components/_dropdown-menus/sort-dashboard-dropdown/sort-dashboard-dropdown.component';

@Injectable({
  providedIn: 'root',
})


//TODO : cleanup this fie => gather related Subjects in objects.
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SynchUIService {
  chartOrderBy$ = new BehaviorSubject<OrderByOption>(ProjectsSharedProperties.orderByOptions[1]);
  projectsChartOrderBy$ = new BehaviorSubject<OrderByOption>(null);

  removeEmptyEntries$ = new BehaviorSubject<boolean>(false);
  removeEmptyEntries: boolean;

  showOnlyEmptyEntries$ = new BehaviorSubject<boolean>(false);
  showOnlyEmptyEntries: boolean;

  disableFilter$ = new Subject<boolean>();

  filterByNameSearchQuery$ = new BehaviorSubject<string>('');
  tableListFilterByNameSearchQuery$ = new BehaviorSubject<[string]>(['']);

  routeHasChanged$ = new Subject<boolean>();

  deleteSearchQuery$ = new Subject<boolean>();
  reRunSearchQuery$ = new Subject<boolean>();

  lastScrollTopPosition$ = new BehaviorSubject<number>(0);

  showGroupsPanel$ = new BehaviorSubject<boolean>(false);

  currentlySelectedColumns$ = new BehaviorSubject<[TableColumnsNames[] , TableColumnsNames?]>([[] , null]);

  filter = {
    hideProjects$: new BehaviorSubject<TableColumnsNames[]>([]),
    showOnlyProjects$: new BehaviorSubject<TableColumnsNames[]>([]),
  }

  showFilterDropdown$ = new BehaviorSubject<boolean>(false);
  showTypeOfDataDropdown$ = new BehaviorSubject<boolean>(false);
  showViewTypesTabs$ = new BehaviorSubject<boolean>(false);
  showNavBarsContainer$ = new BehaviorSubject<boolean>(false);
  showSelectedGroupNameBanner$ = new BehaviorSubject<boolean>(false);
  showGroupsOverviewTitle$ = new BehaviorSubject<boolean>(true);

  changeCards$ = new BehaviorSubject<CardsTypeOption>(ProjectsSharedProperties.cardsTypeOptions[1]);

  howFarWeGoBack$ = new BehaviorSubject<howFarWeGoBack>(howFarWeGoBack.LAST_90_DAYS);

  dashboardView = {
    sortBy$: new BehaviorSubject<sortByOptions>(sortByOptions.TEST_COVERAGE)
  }

  detailsView = {
    clickedPipeline$    : new Subject<Pipeline>(),
    clickedTestReport$  : new Subject<TestReport>(),
  }


  toggleRemoveEmptyEntries(flag?: boolean) {
      if(flag === false) { this.removeEmptyEntries = flag }
      else { this.removeEmptyEntries = !this.removeEmptyEntries }

      this.removeEmptyEntries$.next(this.removeEmptyEntries);
  }


  toggleShowOnlyEmptyEntries(flag?: boolean) {
    if(flag === false) { this.showOnlyEmptyEntries = flag }
    else { this.showOnlyEmptyEntries = !this.showOnlyEmptyEntries }

    this.showOnlyEmptyEntries$.next(this.showOnlyEmptyEntries);
  }


  disableFilter() {
    this.disableFilter$.next(true);
    this.toggleRemoveEmptyEntries(false);
    this.toggleShowOnlyEmptyEntries(false);
  }


  reRunFilter() {
    if(this.removeEmptyEntries$.getValue()) {
      this.removeEmptyEntries$.next(this.removeEmptyEntries$.getValue())
    }

    if(this.showOnlyEmptyEntries$.getValue()) {
      this.showOnlyEmptyEntries$.next(this.showOnlyEmptyEntries$.getValue())
    }
  }

  resetFilterByName() {
    this.filterByNameSearchQuery$.next('');
    this.tableListFilterByNameSearchQuery$.next(['']);
  }

} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


