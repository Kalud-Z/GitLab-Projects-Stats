import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SynchUIService } from '../../_services/synch-ui.service';
import { RoutingService } from '../../_services/routing.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SearchBarComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private synchUIService : SynchUIService,
              private routingService : RoutingService) { }


  ngOnInit(): void {
    this.synchUIService.deleteSearchQuery$.subscribe(() => { this.deleteSearchQuery() });
    this.synchUIService.reRunSearchQuery$.subscribe(() => { this.reRunSearchQuery() });
  }

  deleteSearchQuery() {
    this.searchInput.nativeElement.value = '';
    this.typingSearchQuery('');
  }

  typingSearchQuery(searchInput: string) {
    this.synchUIService.filterByNameSearchQuery$.next(searchInput);
    this.synchUIService.tableListFilterByNameSearchQuery$.next([searchInput]);
  }


  shouldWeHideThisComponent() {  // hide in detailView , and chartView
    return this.routingService.areWeInDetailsView() || this.routingService.areWeInChartView();
  }

  getPlaceHolderText() {
    if(this.routingService.areWeInOverview()) { return 'search for groups or projects ... ' }
    else { return 'search for projects ... ' }
  }

  shouldWeHideThisElement() {
    return !this.routingService.areWeInChartView()
  }


  private reRunSearchQuery() {
    // TODO : refactor this to be triggered just right after the projects are loaded.
    setTimeout(() => this.typingSearchQuery(this.searchInput?.nativeElement.value) , 200);
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
