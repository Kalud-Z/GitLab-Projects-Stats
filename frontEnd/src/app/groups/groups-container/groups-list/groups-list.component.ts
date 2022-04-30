import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../../../shared/_services/fetch-data.service';
import { Group } from '../../../shared/_models/group.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../../shared/_models/project.model';
import { GroupsDataService } from '../../_shared/_services/groups-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupsListComponent implements OnInit {
  projectsToDisplay: Project[];
  isDataAvailable = false;
  private selectedGroup: Group;


  constructor(private route: ActivatedRoute,
              private dataCrudService: FetchDataService,
              private groupsDataService: GroupsDataService,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params.id) {
        const groupID = +params.id
        this.selectedGroup = this.dataCrudService.getGroupByID(groupID);
        if(this.selectedGroup) {
          if(this.selectedGroup.name === 'Customers') {
            this.projectsToDisplay = this.dataCrudService.getAllProjectsOfSubgroups(this.selectedGroup);
          }
          else { this.projectsToDisplay = this.selectedGroup.projects }
          this.isDataAvailable = true;
          this.groupsDataService.updateSelectedGroup(this.selectedGroup);
        }
      }
    });



  }






} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
