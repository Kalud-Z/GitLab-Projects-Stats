import { Injectable } from '@angular/core';

import { AjaxService } from './ajax.service';
import { Group } from '../_models/group.model';
import { Project } from '../_models/project.model';

import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import {
  groupIndexOfCustomers,
  groupNameOfCustomers,
  setGroupIndexOfCustomers,
  setGroupNameOfCustomers,
} from '../_other/global-shared-variables';



enum localStorageNames { GROUPS = 'GROUPS' , DATA_LAST_UPDATED_DATE = 'DATA_LAST_UPDATED_DATE' }


@Injectable({ providedIn: 'root' })
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class FetchDataService {
  childGroups$  = new BehaviorSubject<Group[]>(null);
  childGroups: Group[] = [];

  constructor(private ajaxService : AjaxService) {}


  getGroups():Group[] {
    if(this.childGroups.length !== 0) { return this.childGroups.slice() }
  }

  getGroupByID(id: number): Group {
    let finalGroup = {} as Group;
    this.childGroups$.getValue().forEach(group => {
      if(group.id === id) { finalGroup = group  }
      group.subGroups?.forEach(subGroup => {
        if(subGroup.id === id) { finalGroup = subGroup  }
      });
    });

    return finalGroup;
  }

  getAllProjectsOfSubgroups(group : Group): Project[] {
    console.log('group : ' , group);

    const finalArray: Project[] = [];
    if(group.subGroups?.length > 0) {
      group.subGroups.forEach(subGroup => finalArray.push(...subGroup.projects));
    }

    return finalArray;
  }




  async getAllGroupsFromDatabase() {
    // check local storage first
    if (environment.useLocalStorage) { // in dev mode , we use the local storage.
      const groupsArray = JSON.parse(localStorage.getItem(localStorageNames.GROUPS));  // get data from local storage.
      if (groupsArray && groupsArray.length !== 0) {
        // console.log('we just fetched from local storage')
        this.childGroups = groupsArray;
        this.childGroups$.next(groupsArray);
      } else {
        this.ajaxService.fetchGroupsFromFirebase().subscribe(groups => {
          this.childGroups = groups;
          this.childGroups$.next(groups);
          localStorage.setItem(localStorageNames.GROUPS, JSON.stringify(this.childGroups));  // save data to local storage
        });
      }
    } else { // in prod mode we always use firebase database
      // console.log('we just fetched from firebase')
      // this.ajaxService.fetchGroupsFromFirebase().subscribe(groups => {
      //   this.childGroups = groups;
      //   this.childGroups$.next(groups);
      // });

      await this.ajaxService.fetchGroupsFromNestJS().then(groups => {
        this.adjustIds(groups);
        const copy = _.cloneDeep(groups);
        // const finalArrayOfGroups = this.reconstructTheData(copy);
        const finalArrayOfGroups = copy;

        this.childGroups = finalArrayOfGroups;
        this.setCustomerGroupDetails();
        this.childGroups$.next(finalArrayOfGroups);
        localStorage.setItem(localStorageNames.GROUPS, JSON.stringify(this.childGroups));  // save data to local storage
      });


    } // endOfElse
  } // end of Method

  private adjustIds(allGroups: any[]) {
    allGroups.forEach(group => {
      group.id = group.gitlabId;
      group.projects.forEach(project => {
        project.id = project.gitlabId;
        project.pipelines.forEach(pipeline => pipeline.id = pipeline.gitlabId );
      });
    });
  }

  private reconstructTheData(groups : any[]): any[] {
    let groupWithSubGroups: any = {};
    const finalArray = [];

    groups.forEach(group => {
      if(group.stats.isThereSubgroups) { groupWithSubGroups = group }
    });

    const subGroupsOfCustomers = [...groupWithSubGroups.subGroups];
    groupWithSubGroups.subGroups = [];

    groups.forEach(group => {
      const isCurrentGroupASubGroupOfCustomers =  this.isItASubGroupOfCustomer(group , subGroupsOfCustomers)
      if(isCurrentGroupASubGroupOfCustomers) { groupWithSubGroups.subGroups.push(group) }
    }) // after this : Customers is filled with its correct subgroups.

    groups.forEach(group => {
      const isCurrentGroupASubGroupOfCustomers = this.isItASubGroupOfCustomer(group , subGroupsOfCustomers)
      if(!isCurrentGroupASubGroupOfCustomers) { finalArray.push(group) }
    }) // after this : we removed all the subgroups from the original array of groups.

    return finalArray;
  }

  private isItASubGroupOfCustomer(group: any, subGroupsOfCustomers: any[]): boolean {
    let finalResult = false;
    subGroupsOfCustomers.forEach(subGroupOfCustomers => {
      if(subGroupOfCustomers.name === group.name) { finalResult = true }
    });

    return finalResult
  }

  private setCustomerGroupDetails() {
    this.childGroups.forEach((group , index) => {
      if(group.stats.isThereSubgroups) {
        setGroupIndexOfCustomers(index)
        setGroupNameOfCustomers(group.name)
        console.log(groupNameOfCustomers)
        console.log(groupIndexOfCustomers)
      }
    });
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



