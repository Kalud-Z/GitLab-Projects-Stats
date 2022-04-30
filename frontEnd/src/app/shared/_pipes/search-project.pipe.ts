import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../_models/project.model';

@Pipe({
  name: 'searchProject',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SearchProjectPipe implements PipeTransform {

  transform(allProjects: Project[], query : string): Project[] {
    if(!query || query.length === 0) { return allProjects }

    const finalArray: Project[] = [];

    const queryCaseSmall = query.toLowerCase();

    allProjects.forEach(project => {
      if(project.name.toLowerCase().includes(queryCaseSmall) || project.id.toString().includes(queryCaseSmall)) {
        finalArray.push(project);
      }
    });

    return finalArray;
  }

}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

