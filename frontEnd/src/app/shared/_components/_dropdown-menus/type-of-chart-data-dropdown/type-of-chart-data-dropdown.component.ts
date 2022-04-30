import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderByOption } from '../../../_interfaces/dropdown-menu-option.interface';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { RoutingService } from '../../../_services/routing.service';

@Component({
  selector: 'app-type-of-chart-data-dropdown',
  templateUrl: './type-of-chart-data-dropdown.component.html',
  styleUrls: ['./type-of-chart-data-dropdown.component.scss' , '../_shared/dropdown-menus-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TypeOfChartDataDropdownComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  currentSelectedOption: OrderByOption;

  @Input() orderByOptions: OrderByOption[];
  @Output() optionClicked: EventEmitter<OrderByOption> = new EventEmitter();


  constructor(public synchUIService: SynchUIService , private routingService: RoutingService) { }

  ngOnInit(): void {
    this.currentSelectedOption = this.orderByOptions[1];
    this.optionClicked.emit(this.currentSelectedOption);
  }  // ngOninit


  onClickOption(event) {
    const clickedOptionID = event.target.id;
    this.currentSelectedOption = this.determineClickedOption(clickedOptionID);
    this.optionClicked.emit(this.currentSelectedOption);
  }



  shouldWeHideThisComponent() {
    if(this.routingService.areWeInOverview() ||
      this.routingService.areWeInListView()  ||
      this.routingService.areWeInCardView()) { return false }
    else { return true }
  }


  shouldWeBlurThisComponentFN() {
    return this.routingService.areWeInDetailsView();
  }


  private determineClickedOption(id : string): OrderByOption {
    let result: OrderByOption;
    this.orderByOptions.forEach(option => {
      if(option.id === id) { result = option }
    });
    return result;
  }



}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
