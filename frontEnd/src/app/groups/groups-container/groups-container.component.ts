import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardsTypeOption, OrderByOption } from '../../shared/_interfaces/dropdown-menu-option.interface';
import { SynchUIService } from '../../shared/_services/synch-ui.service';
import { Group } from '../../shared/_models/group.model';
import { FetchDataService } from '../../shared/_services/fetch-data.service';
import { GroupsDataService } from '../_shared/_services/groups-data.service';
import { RoutingService } from '../../shared/_services/routing.service';
import { GroupsRoutingService } from '../_shared/_services/groups-routing.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { groupsPanelTrigger, viewTypeRouteTransitionAnimations } from '../../shared/_animations/animations';
import { ProjectsSharedProperties } from '../../projects/_shared/_other/projects-shared-properties';
import { concatMap } from 'rxjs/operators';
import { groupIndexOfCustomers, groupNameOfCustomers } from '../../shared/_other/global-shared-variables';


@Component({
  selector: 'app-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.scss'],
  providers : [GroupsRoutingService],
  animations : [
    groupsPanelTrigger ,
    viewTypeRouteTransitionAnimations,
  ],
})



// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupsContainerComponent implements OnInit , AfterViewInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  remove = false;
  CustomerGroupIndex = groupIndexOfCustomers
  CustomerGroupName = groupNameOfCustomers

  orderByOptions:  OrderByOption[] = ProjectsSharedProperties.orderByOptions;
  cardsTypeOptions:  CardsTypeOption[] = ProjectsSharedProperties.cardsTypeOptions;


  allGroups: Group[];
  showCustomersSubgroups = false;
  closeGroupPanelContainer = true;

  selectedGroup: Group;
  isSubgroupSelected: boolean;

  currentURL: string;



  constructor(public synchUIService : SynchUIService,
              private dataCrudService: FetchDataService,
              public groupsDataService : GroupsDataService,
              private routingService: RoutingService,
              private groupsRoutingService: GroupsRoutingService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              ) {}



  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.viewTabsRouteAnimation;
  }


  ngOnInit(): void {
    this.dataCrudService.childGroups$.pipe(
      concatMap(groups => {
        this.allGroups = groups;
        return this.groupsDataService.selectedGroup$;
      })).subscribe(group => {
      this.selectedGroup = group;
      const customersGroup: Group[] = this.allGroups.filter(_group => {
         return _group.name === 'Customers';
      });

      const subGroups: Group[] = customersGroup[0].subGroups;
      this.isSubgroupSelected = subGroups.indexOf(this.selectedGroup) !== -1;
      //  ==>   this.isSubgroupSelected = customersGroup[0].subGroups.indexOf(this.selectedGroup) !== -1;
    });

  } // ngOninit



  ngAfterViewInit() {
    this.cdr.detectChanges();
  }


  onTypeOfChartDataDropdownClick(currentSelectedOption: OrderByOption) {
    this.changeChart(currentSelectedOption);
    this.synchUIService.disableFilter();
  }


  showProjects(event: any ,  group: Group , isSubGroupClicked: boolean) {
    this.isSubgroupSelected = isSubGroupClicked
    event.stopPropagation();
    const currentURL = this.routingService.getCurrentURL();
     if     (currentURL.includes('charts')) { this.routingService.goToGroupsChartView(group.id) }
     else if(currentURL.includes('list'))   { this.routingService.goToGroupsListView(group.id) }
     else if(currentURL.includes('cards'))  { this.routingService.goToGroupsCardView(group.id) }
  }



  shouldWeHideThisElement_groupsOverviewTitle() {
    return this.routingService.areWeInOverview();
  }

  shouldWeHideThisElement_selectedGroupName() {
    const areWeInOverview = this.routingService.areWeInOverview()
    const areWeInDetailsView = this.routingService.areWeInDetailsView()
    return !(areWeInOverview || areWeInDetailsView)
  }

  shouldWeHideThisElement_groupPanelContainer() {
    return !(this.routingService.areWeInOverview() || this.routingService.areWeInDetailsView())
  }


  highlightSelectedGroup(group: Group) {
    let finalResult = false;
    let isSubGroupOfCustomersSelectedResult: boolean;
    if(group === this.selectedGroup) { finalResult = true; }
    isSubGroupOfCustomersSelectedResult = group.name === this.CustomerGroupName && this.isSubgroupSelected;
    return finalResult || isSubGroupOfCustomersSelectedResult
  }


  onTypeOfChartsDataDropdownClick(currentSelectedOption) {
    if(this.routingService.areWeInListView()) { this.changeList(currentSelectedOption) }
    if(this.routingService.areWeInChartView()) { this.changeChart(currentSelectedOption)}
  }



  onTypeOfCardsDataDropdownClick(currentSelectedOption: CardsTypeOption) {
    this.changeCards(currentSelectedOption);
    this.synchUIService.disableFilter();
  }



  private changeChart(option : OrderByOption) {
    this.synchUIService.chartOrderBy$.next(option);
    this.synchUIService.disableFilter();
  }


  private changeList(option: OrderByOption) {
    this.synchUIService.chartOrderBy$.next(option);
    this.synchUIService.disableFilter();
  }

  private changeCards(option : OrderByOption) {
    this.synchUIService.changeCards$.next(option);
    this.synchUIService.disableFilter();
  }


} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°






