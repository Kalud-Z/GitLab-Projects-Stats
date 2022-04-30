import { Component, OnInit } from '@angular/core';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { RoutingService } from '../../../_services/routing.service';
import { fetchFromLocalStorage, updateLocalStorage } from '../_shared/shared-functions';
import { localStorageFilterType } from '../_shared/shared-types';


export enum sortByOptions  { TEST_COVERAGE = 'test coverage' , LAST_ACTIVITY = 'last activity' , REPO_SIZE = 'repo size' , ARTIFACTS_SIZE = 'artifacts size' }

@Component({
  selector: 'app-sort-dashboard-dropdown',
  templateUrl: './sort-dashboard-dropdown.component.html',
  styleUrls: ['./sort-dashboard-dropdown.component.scss' , '../_shared/dropdown-menus-shared.scss']
})
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SortDashboardDropdownComponent implements OnInit {

  sortByOptions = sortByOptions;
  sortByOptionsText = Object.values(sortByOptions);
  sortByCurrentlySelected = this.sortByOptions.TEST_COVERAGE

  constructor(public synchUIService: SynchUIService , private routingService: RoutingService) { }


  ngOnInit(): void {
    const fetchedValue = fetchFromLocalStorage(localStorageFilterType.SORT_DASHBOARD_DROPDOWN);
    if(fetchedValue) { this.sortByCurrentlySelected = fetchedValue }
    else { this.sortByCurrentlySelected = sortByOptions.TEST_COVERAGE }
  }


  optionClicked(optionClicked: sortByOptions) {
    this.sortByCurrentlySelected = optionClicked;

    // we send the data to the dashboard view component
    this.synchUIService.dashboardView.sortBy$.next(this.sortByCurrentlySelected);
    updateLocalStorage(localStorageFilterType.SORT_DASHBOARD_DROPDOWN, this.sortByCurrentlySelected);
  }


  shouldWeHideThisComponent() {
    if(this.routingService.areWeInOverview()    || this.routingService.areWeInListView()
      || this.routingService.areWeInChartView() || this.routingService.areWeInDetailsView() ) { return false }
    else { return true }
  }



} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
