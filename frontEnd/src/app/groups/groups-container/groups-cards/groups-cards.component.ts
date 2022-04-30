import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/_models/project.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchDataService } from '../../../shared/_services/fetch-data.service';
import { GroupsDataService } from '../../_shared/_services/groups-data.service';
import { Group } from '../../../shared/_models/group.model';

@Component({
  selector: 'app-groups-cards',
  templateUrl: './groups-cards.component.html',
  styleUrls: ['./groups-cards.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupsCardsComponent implements OnInit { // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  renderNow = false;

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
          if(!this.selectedGroup.projects?.length) {
            this.projectsToDisplay = this.dataCrudService.getAllProjectsOfSubgroups(this.selectedGroup);
          }
          else { this.projectsToDisplay = this.selectedGroup.projects }
          this.isDataAvailable = true;
          this.groupsDataService.updateSelectedGroup(this.selectedGroup);
        }
      }
    });
  } // ngOnInit






} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
