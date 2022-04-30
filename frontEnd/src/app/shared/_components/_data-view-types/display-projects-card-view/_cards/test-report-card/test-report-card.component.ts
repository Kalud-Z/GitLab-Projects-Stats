import { Component, Input, OnInit } from '@angular/core';
import { Project } from "../../../../../_models/project.model";
import { RoutingService } from "../../../../../_services/routing.service";

@Component({
  selector: 'app-test-report-card',
  templateUrl: './test-report-card.component.html',
  styleUrls: ['./test-report-card.component.scss' , '../_shared/cards-shared.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestReportCardComponent {
  @Input() project: Project;

  constructor(private routingService: RoutingService) {}

  goToRepo(event , project: Project) {
    event.stopPropagation();
    this.routingService.goToRepo(project);
  }



}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
