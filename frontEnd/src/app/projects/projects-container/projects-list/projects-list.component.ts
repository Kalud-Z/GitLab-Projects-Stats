import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/_models/project.model';
import { ProjectsDataService } from '../../_shared/_services/projects-data.service';
import { SynchUIService } from '../../../shared/_services/synch-ui.service';
import { RoutingService } from '../../../shared/_services/routing.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectsListComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  projects: Project[];
  isDataAvailable = false;


  constructor(
    private projectsDataService: ProjectsDataService,
    public routingService : RoutingService,
    public synchUIService : SynchUIService,
  ) {}

  ngOnInit(): void {
    this.projects = this.projectsDataService.getAllProjectsArray();
    // if(this.projects) { this.isDataAvailable = true }
    this.isDataAvailable = !!this.projects
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

