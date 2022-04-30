import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../../../../_models/project.model';

@Pipe({
  name: 'filterProjectsByNameOrID',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class FilterProjectsByNameOrIDPipe implements PipeTransform {

  transform(allProjects: Project[], query : string[]): Project[] {
    if(!query[0] || query[0].length === 0) { return allProjects }
    if(!allProjects || allProjects.length === 0) { return allProjects }

    const finalArray: Project[] = [];

    const queryCaseSmall = query[0].toLowerCase();

    allProjects.forEach(project => {
      if(project.name.toLowerCase().includes(queryCaseSmall) || project.id.toString().includes(queryCaseSmall)) {
        finalArray.push(project);
      }
    });

    return finalArray;
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
