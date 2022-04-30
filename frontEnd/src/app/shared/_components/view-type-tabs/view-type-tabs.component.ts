import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SynchUIService } from '../../_services/synch-ui.service';
import { RoutingService } from '../../_services/routing.service';
import { Router } from '@angular/router';


export enum ViewTypes { CHART_VIEW = 'chartsView' , LIST_VIEW = 'listView' , CARDS_VIEW = 'cardsView' , DASHBOARD_VIEW = 'dashboardView' }

@Component({
  selector: 'view-type-tabs',
  templateUrl: './view-type-tabs.component.html',
  styleUrls: ['./view-type-tabs.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ViewTypeTabsComponent implements OnInit {
  selectedTab: ViewTypes;
  viewTypes = ViewTypes;
  loadingNewViewDelay = 1;


  constructor(public synchUIService : SynchUIService,
              public  routingService : RoutingService,
              private router : Router,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.detectInitialSelectedTab();

    this.synchUIService.routeHasChanged$.subscribe(() => {
      this.detectInitialSelectedTab();
    })
  }

  tabClicked(type?:ViewTypes) {
    this.selectedTab = type;
    this.synchUIService.disableFilter();
    this.synchUIService.reRunSearchQuery$.next(true);
  }



  shouldWeHideThisComponent() {
    return !this.routingService.areWeInOverview()
  }



  showCardView() {
    this.tabClicked(ViewTypes.CARDS_VIEW);

    setTimeout(() => {
      if(this.routingService.areWeInGroupsView()) { this.routingService.goToGroupsCardView() }
      else { this.router.navigate(['/projects/cards/']) }
    } , this.loadingNewViewDelay)
  }


  showChartView() {
    this.tabClicked(ViewTypes.CHART_VIEW);

    setTimeout(() => {
      if(this.routingService.areWeInGroupsView()) { this.routingService.goToGroupsChartView() }
      else { this.router.navigate(['/projects/charts/']) }
    } , this.loadingNewViewDelay)
  }


  showListView() {
    this.tabClicked(ViewTypes.LIST_VIEW);

    setTimeout(() => {
      if(this.routingService.areWeInGroupsView()) { this.routingService.goToGroupsListView() }
      else { this.router.navigate(['/projects/list/']) }
    } , this.loadingNewViewDelay)
  }



  private detectInitialSelectedTab() {
    if(this.routingService.areWeInCardView()) { this.selectedTab = ViewTypes.CARDS_VIEW }
    if(this.routingService.areWeInChartView()) { this.selectedTab = ViewTypes.CHART_VIEW }
    if(this.routingService.areWeInListView()) { this.selectedTab = ViewTypes.LIST_VIEW }
    if(this.routingService.areWeInDashboardView()) { this.selectedTab = ViewTypes.DASHBOARD_VIEW }
  }


  showDashboardView() {
    this.tabClicked(ViewTypes.DASHBOARD_VIEW);
    this.router.navigate(['/projects/dashboard/'])

    // setTimeout(() => {
    //   this.router.navigate(['/projects/dashboard/'])
    // } , this.loadingNewViewDelay);
    //
  }

} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

