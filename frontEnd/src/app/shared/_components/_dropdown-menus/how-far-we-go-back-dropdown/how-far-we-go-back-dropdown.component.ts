import { Component, OnInit } from '@angular/core';
import { RoutingService } from "../../../_services/routing.service";
import { SynchUIService } from "../../../_services/synch-ui.service";
import { localStorageFilterType } from '../_shared/shared-types';
import { fetchFromLocalStorage, updateLocalStorage } from '../_shared/shared-functions';


export enum howFarWeGoBack  { LAST_30_DAYS = 'last 30 days' , LAST_60_DAYS = 'last 60 days' , LAST_90_DAYS = 'last 90 days', ALL_TIME = 'all time'}

export function getNumberOfHowFarWeGoBack(option: howFarWeGoBack): number {
  if(option === howFarWeGoBack.LAST_30_DAYS) { return 30 }
  if(option === howFarWeGoBack.LAST_60_DAYS) { return 60 }
  if(option === howFarWeGoBack.LAST_90_DAYS) { return 90 }
}


@Component({
  selector: 'app-how-far-we-go-back-dropdown',
  templateUrl: './how-far-we-go-back-dropdown.component.html',
  styleUrls: ['./how-far-we-go-back-dropdown.component.scss' , '../_shared/dropdown-menus-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class HowFarWeGoBackDropdownComponent implements OnInit {
  howFarWeGoBack = howFarWeGoBack;
  howFarWeGoBackText = Object.values(howFarWeGoBack);
  howFarWeGoBackCurrentlySelected = this.howFarWeGoBack.LAST_60_DAYS;

  constructor(public synchUIService: SynchUIService , private routingService: RoutingService) { }


  ngOnInit(): void {
    const howFarWeGoBackFromLocalStorage = fetchFromLocalStorage(localStorageFilterType.HOW_FAR_WE_GO_BACK_DROPDOWN);
    // const howFarWeGoBackFromLocalStorage = JSON.parse(localStorage.getItem(localStorageFilterType.HOW_FAR_WE_GO_BACK_DROPDOWN));
    if(howFarWeGoBackFromLocalStorage) { this.howFarWeGoBackCurrentlySelected = howFarWeGoBackFromLocalStorage }
    else { this.howFarWeGoBackCurrentlySelected = howFarWeGoBack.LAST_90_DAYS }
  }


  // updateLocalStorage() {
  //   localStorage.setItem(localStorageFilterType.HOW_FAR_WE_GO_BACK_DROPDOWN, JSON.stringify(this.howFarWeGoBackCurrentlySelected));
  // }



  optionClicked(optionClicked: howFarWeGoBack) {
    this.howFarWeGoBackCurrentlySelected = optionClicked;
    updateLocalStorage(localStorageFilterType.HOW_FAR_WE_GO_BACK_DROPDOWN , this.howFarWeGoBackCurrentlySelected);

    // we send the data to the cards view component
    this.synchUIService.howFarWeGoBack$.next(this.howFarWeGoBackCurrentlySelected);
  }


  shouldWeHideThisComponent() {
    if(this.routingService.areWeInOverview()  || this.routingService.areWeInChartView()
      || this.routingService.areWeInDetailsView() ) { return false }
    else { return true }
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
