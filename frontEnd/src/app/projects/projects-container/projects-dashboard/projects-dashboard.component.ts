import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/_models/project.model';
import { ProjectsDataService } from '../../_shared/_services/projects-data.service';
import { SynchUIService } from '../../../shared/_services/synch-ui.service';
import { RoutingService } from '../../../shared/_services/routing.service';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectsDashboardComponent implements OnInit {

  allProjects: Project[];

  renderNow = false;

  constructor(
    private projectsDataService: ProjectsDataService,
    public synchUIService: SynchUIService,
    public routingService : RoutingService,
  ) { }

  ngOnInit(): void {
    this.allProjects = this.projectsDataService.getAllProjectsArray();
    this.renderNow = true;
  }

} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
