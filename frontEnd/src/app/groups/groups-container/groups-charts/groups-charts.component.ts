import { Component, OnInit } from '@angular/core';
import { Group } from '../../../shared/_models/group.model';
import { FetchDataService } from '../../../shared/_services/fetch-data.service';
import { GroupsDataService } from '../../_shared/_services/groups-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../../shared/_models/project.model';


@Component({
  selector: 'app-groups-charts',
  templateUrl: './groups-charts.component.html',
  styleUrls: ['./groups-charts.component.scss'],
})


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupsChartsComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
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

      console.log('er are in ngonint of groupsCharts , and this the projects : ' , this.projectsToDisplay)
    });

  }





}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



