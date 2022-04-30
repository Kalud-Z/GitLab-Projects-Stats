import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RoutingService } from "../../../../../_services/routing.service";
import { Project } from "../../../../../_models/project.model";

@Component({
  selector: 'app-test-coverages-chart-card',
  templateUrl: './test-coverages-chart-card.component.html',
  styleUrls: ['./test-coverages-chart-card.component.scss' , '../_shared/cards-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestCoveragesChartCardComponent  {
  @Input() project: Project;
  noPipelinesAvailableInLastXXXDays = false;

  constructor(private routingService: RoutingService) { }

  goToRepo(event , project: Project) {
    event.stopPropagation();
    this.routingService.goToRepo(project);
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
