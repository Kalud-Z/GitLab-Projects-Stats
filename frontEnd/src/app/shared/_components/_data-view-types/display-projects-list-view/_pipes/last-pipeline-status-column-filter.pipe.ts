import { Pipe, PipeTransform } from '@angular/core';
import { LAST_PIPELINE_STATUS } from '../../../last-pipeline-status/last-pipeline-status.component';
import { Project } from '../../../../_models/project.model';

@Pipe({
  name: 'lastPipelineStatusColumnFilter'
})
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class LastPipelineStatusColumnFilterPipe implements PipeTransform {

  transform(projectsToFilter: Project[], selectedFilterOptions: LAST_PIPELINE_STATUS[]): Project[] {
    if(selectedFilterOptions.length === 0 || !selectedFilterOptions) { return projectsToFilter}

    let finalArray: Project[] = [];

    projectsToFilter.forEach(projectToFilter => {
      if(selectedFilterOptions.indexOf(projectToFilter.stats.status as LAST_PIPELINE_STATUS) !== -1)
        finalArray.push(projectToFilter);
    });

    return finalArray;
  }

}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
