import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RoutingService } from '../../shared/_services/routing.service';
import { CardsTypeOption, OrderByOption } from '../../shared/_interfaces/dropdown-menu-option.interface';
import { SynchUIService } from '../../shared/_services/synch-ui.service';
import { ProjectsSharedProperties } from '../_shared/_other/projects-shared-properties';
import { RouterOutlet } from '@angular/router';
import { viewTypeRouteTransitionAnimations } from '../../shared/_animations/animations';

@Component({
  selector: 'app-projects-container',
  templateUrl: './projects-container.component.html',
  styleUrls: ['./projects-container.component.scss'],
  animations: [viewTypeRouteTransitionAnimations],

})


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectsContainerComponent implements AfterViewInit{
  orderByOptions:  OrderByOption[] = ProjectsSharedProperties.orderByOptions;
  cardsTypeOptions:  CardsTypeOption[] = ProjectsSharedProperties.cardsTypeOptions;

  currentURL: string;

  constructor(public routingService : RoutingService,
              private cdr: ChangeDetectorRef,
              private synchUIService : SynchUIService) {}



  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.viewTabsRouteAnimation;
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

  private changeCards(option : OrderByOption) {
    this.synchUIService.changeCards$.next(option);
    this.synchUIService.disableFilter();
  }

  private changeList(option: OrderByOption) {
    this.synchUIService.chartOrderBy$.next(option);
    this.synchUIService.disableFilter();
  }

}
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°






