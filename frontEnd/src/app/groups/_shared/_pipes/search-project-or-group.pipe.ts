import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../../../shared/_models/group.model';

@Pipe({
  name: 'searchProjectOrGroup',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SearchProjectOrGroupPipe implements PipeTransform {

  transform(allGroups: Group[], query : string): Group[] {
    if(!query || query.length === 0) { return allGroups }

    const finalArray: Group[] = [];
    const queryCaseSmall = query.toLowerCase();

    allGroups.forEach(group => {
      if(group.name.toLowerCase().includes(queryCaseSmall) || group.id.toString().includes(queryCaseSmall)) {
        this.pushGroup(group , finalArray)
      }

      if(group.projects?.length > 0) {
        group.projects.forEach(project => {
          if(project.name.toLowerCase().includes(queryCaseSmall) || project.id.toString().includes(queryCaseSmall)) { this.pushGroup(group , finalArray) }
        });
      }

      if(group.subGroups?.length > 0) {
        group.subGroups.forEach(subGroup => {
          if(subGroup.name.toLowerCase().includes(queryCaseSmall) || subGroup.id.toString().includes(queryCaseSmall)) { this.pushGroup(group , finalArray) }
          if(subGroup.projects?.length > 0) {
            subGroup.projects.forEach(project => {
              if(project.name.toLowerCase().includes(queryCaseSmall) || project.id.toString().includes(queryCaseSmall)) { this.pushGroup(group , finalArray) }
            });
          }
        });
      }

    });

    return finalArray;
  }



  private pushGroup(group: Group , finalArray : Group[]) {
    if(finalArray.indexOf(group) === -1) {
      finalArray.push(group);
    }
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
