import { Component, OnInit } from '@angular/core';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { RoutingService } from '../../../_services/routing.service';
import { TableColumnsNames } from '../../_data-view-types/display-projects-list-view/display-projects-list-view.component';
import { fetchFromLocalStorage, updateLocalStorage } from '../_shared/shared-functions';
import { localStorageFilterType } from '../_shared/shared-types';


//TODO : this component needs cleaning. check the template!

interface SelectedOptions {
  hideProjects: TableColumnsNames[];
  showOnlyProjects : TableColumnsNames[]
}


@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class FilterDropdownComponent implements OnInit {
  removeEmptyEntriesIsOn = false;
  showOnlyEmptyEntriesIsOn = false;
  isFilterOn = false;
  TableColumnsNames = TableColumnsNames;

  selectedOptions: SelectedOptions = {
    hideProjects: [],
    showOnlyProjects: [],
  }


  constructor(public synchUIService: SynchUIService, private routingService : RoutingService) {}

  ngOnInit(): void {
    this.synchUIService.removeEmptyEntries$.subscribe(flag => this.removeEmptyEntriesIsOn = flag);
    this.synchUIService.showOnlyEmptyEntries$.subscribe(flag => this.showOnlyEmptyEntriesIsOn = flag);
    this.synchUIService.disableFilter$.subscribe(flag => { if(flag) { this.disableFilter() } });

    this.checkLocalStorage();
  } // ngOninit



  adjustLocalStorage() {
    let values = {
      removeEmptyEntriesIsOn   : this.removeEmptyEntriesIsOn,
      showOnlyEmptyEntriesIsOn : this.showOnlyEmptyEntriesIsOn
    }

    updateLocalStorage(localStorageFilterType.FILTER_DROPDOWN , values);
  }

  checkLocalStorage() {
    const values = fetchFromLocalStorage(localStorageFilterType.FILTER_DROPDOWN);
    if(values?.showOnlyEmptyEntriesIsOn) { this.synchUIService.toggleShowOnlyEmptyEntries(true) }
    if(values?.removeEmptyEntriesIsOn)   { this.synchUIService.toggleRemoveEmptyEntries(true) }
    this.updateFilterStatus();
  }


  onToggle_RemoveEmptyEntries() {
    this.synchUIService.toggleShowOnlyEmptyEntries(false); // we deactivate this filter first.
    this.removeEmptyEntriesIsOn = !this.removeEmptyEntriesIsOn;
    this.synchUIService.toggleRemoveEmptyEntries();
    this.updateFilterStatus();
    this.adjustLocalStorage();
  }



  onToggle_ShowOnlyEmptyEntries() {
    this.synchUIService.toggleRemoveEmptyEntries(false); // we deactivate this filter first.
    this.showOnlyEmptyEntriesIsOn = !this.showOnlyEmptyEntriesIsOn;
    this.synchUIService.toggleShowOnlyEmptyEntries();
    this.updateFilterStatus();
    this.adjustLocalStorage();
  }


  shouldWeBlurThisComponent() {
    return this.routingService.areWeInDetailsView();
  }


  onDeactivateFilter() {
    if(this.isFilterOn) {
      // in cards view
      this.isFilterOn = false;
      this.synchUIService.disableFilter();

      // in table list view
      this.selectedOptions.hideProjects = [];
      this.selectedOptions.showOnlyProjects = [];
      this.nextUpdatedFilterOptions();
      this.adjustLocalStorage();
    }
  }


  shouldWeHideThisComponent() {
    return  this.routingService.areWeInOverview() || this.routingService.areWeInListView()
  }


  areWeInListView() {
    return  this.routingService.areWeInListView();
  }


  toggle_HideProjectsOption(columnType: TableColumnsNames) {
    const index = this.selectedOptions.hideProjects.indexOf(columnType);
    if(index === -1) {
      this.deactivateItsCounterpart(this.selectedOptions.showOnlyProjects ,  columnType);
      this.selectedOptions.hideProjects.push(columnType);
    }
    else { this.selectedOptions.hideProjects.splice(index , 1) }

    this.nextUpdatedFilterOptions();
    this.toggle_FilterButton();
  }


  toggle_showOnlyProjectsOption(columnType: TableColumnsNames) {
    const index = this.selectedOptions.showOnlyProjects.indexOf(columnType);

    if(index === -1) {
      this.deactivateItsCounterpart(this.selectedOptions.hideProjects ,  columnType);
      this.selectedOptions.showOnlyProjects.push(columnType);
    }
    else { this.selectedOptions.showOnlyProjects.splice(index , 1) }

    this.nextUpdatedFilterOptions();
    this.toggle_FilterButton();
  }


  private updateFilterStatus() {
    this.isFilterOn = this.removeEmptyEntriesIsOn || this.showOnlyEmptyEntriesIsOn;
  }


  private disableFilter() {
    this.isFilterOn = false;
    this.removeEmptyEntriesIsOn = false;
    this.showOnlyEmptyEntriesIsOn   = false;
  }


  private deactivateItsCounterpart(targetArray: TableColumnsNames[], columnType: TableColumnsNames) {
    const index = targetArray.indexOf(columnType);
    if(index !== -1) { targetArray.splice(index , 1)}
  }


  private toggle_FilterButton() {
    this.isFilterOn = this.selectedOptions.showOnlyProjects.length > 0 || this.selectedOptions.hideProjects.length > 0;
  }


  private nextUpdatedFilterOptions() {
    this.synchUIService.filter.hideProjects$.next(this.selectedOptions.hideProjects);
    this.synchUIService.filter.showOnlyProjects$.next(this.selectedOptions.showOnlyProjects);
  }


} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
