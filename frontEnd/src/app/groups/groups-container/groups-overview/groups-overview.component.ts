import { Component, OnInit } from '@angular/core';
import { Group } from '../../../shared/_models/group.model';
import { SynchUIService } from '../../../shared/_services/synch-ui.service';
import { FetchDataService } from '../../../shared/_services/fetch-data.service';
import { GroupsDataService } from '../../_shared/_services/groups-data.service';
import { RoutingService } from '../../../shared/_services/routing.service';

@Component({
  selector: 'app-groups-overview',
  templateUrl: './groups-overview.component.html',
  styleUrls: ['./groups-overview.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupsOverviewComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  allGroups: Group[];
  allGroupsSorted: Group[];
  searchQuery: string;

  constructor(
    public synchUIService : SynchUIService,
    private dataCrudService: FetchDataService,
    private groupsDataService : GroupsDataService,
    private routingService: RoutingService,
  ) { }


  ngOnInit(): void {
    this.dataCrudService.childGroups$.subscribe(groups => {
      this.allGroups = groups;
      // this.allGroupsSorted = this.sortGroups(groups);
      this.allGroupsSorted = this.sortGroups(groups.slice());
    })


    this.synchUIService.filterByNameSearchQuery$.subscribe(query => {
      this.searchQuery = query;
    });

  }



   showProjects(event: any ,  group: Group) {
    event.stopPropagation();
    this.groupsDataService.updateSelectedGroup(group);
    this.routingService.goToGroupsListView(group.id);
    // GroupsSharedMethods.showProjects(event , group);
  }


  private sortGroups(allGroups: Group[]) {
    // let tempGroup
    const compare = (a:Group , b:Group) => {
      let lengthA: number;
      let lengthB : number;
      if(a.projects?.length) { lengthA = a.projects.length }  else { lengthA = a.subGroups.length }
      if(b.projects?.length) { lengthB = b.projects.length }  else { lengthB = b.subGroups.length }
      return  lengthA -  lengthB;
    }

    return allGroups.sort(compare);
  }



}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

