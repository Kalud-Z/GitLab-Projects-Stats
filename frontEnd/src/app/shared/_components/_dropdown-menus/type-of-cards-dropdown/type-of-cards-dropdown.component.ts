import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardsTypeOption } from "../../../_interfaces/dropdown-menu-option.interface";
import { SynchUIService } from "../../../_services/synch-ui.service";
import { RoutingService } from "../../../_services/routing.service";

@Component({
  selector: 'app-type-of-cards-dropdown',
  templateUrl: './type-of-cards-dropdown.component.html',
  styleUrls: ['./type-of-cards-dropdown.component.scss' , '../_shared/dropdown-menus-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TypeOfCardsDropdownComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  currentSelectedOption: CardsTypeOption;

  @Input() cardsTypeOptions: CardsTypeOption[];
  @Output() optionClicked: EventEmitter<CardsTypeOption> = new EventEmitter();


  constructor(public synchUIService: SynchUIService , private routingService: RoutingService) { }

  ngOnInit(): void {
    this.currentSelectedOption = this.cardsTypeOptions[1];
    this.optionClicked.emit(this.currentSelectedOption);
  }  // ngOninit


  onClickOption(event) {
    const clickedOptionID = event.target.id;
    this.currentSelectedOption = this.determineClickedOption(clickedOptionID);
    this.optionClicked.emit(this.currentSelectedOption);
  }



  shouldWeHideThisComponent() {
    if(this.routingService.areWeInOverview()    || this.routingService.areWeInListView() || this.routingService.areWeInDashboardView()
      || this.routingService.areWeInChartView() || this.routingService.areWeInDetailsView() ) { return false }
    else { return true }
  }


  private determineClickedOption(id : string) : CardsTypeOption {
    let result: CardsTypeOption = {} as CardsTypeOption
    this.cardsTypeOptions.forEach(option => { if(option.id === id) { result = option } });
    return result;
  }




}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
