import { Pipe, PipeTransform } from '@angular/core';
import { sortByOptions } from '../../_dropdown-menus/sort-dashboard-dropdown/sort-dashboard-dropdown.component';
import { Project } from '../../../_models/project.model';
import { getDeepCloneOf } from '../../../_other/global-shared-methods';

@Pipe({
  name: 'sortProjects'
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SortProjectsPipe implements PipeTransform {

  transform(projects: Project[], type: sortByOptions): Project[] {
    const projectsCopy = getDeepCloneOf(projects);

    const compare = (a:Project , b:Project) => {
      if(type === sortByOptions.TEST_COVERAGE) {
        if(a.pipelines.length === 0) { a.stats.testCoverage = 0 }
        if(b.pipelines.length === 0) { b.stats.testCoverage = 0 }
        return b.stats.testCoverage - a.stats.testCoverage;
      }

      if(type === sortByOptions.REPO_SIZE) {
        return b.stats.totalRepoSize - a.stats.totalRepoSize;
      }

      if(type === sortByOptions.ARTIFACTS_SIZE) {
        return b.stats.artifactsSize - a.stats.artifactsSize;
      }

      if(type === sortByOptions.LAST_ACTIVITY) {
          let dateA: number;
          let dateB : number;

          if(a.pipelines?.length > 0) { dateA = Date.parse(a.pipelines[0].stats.created_at) }  else { dateA = 0 }
          if(b.pipelines?.length > 0) { dateB = Date.parse(b.pipelines[0].stats.created_at) }  else { dateB = 0 }

          return dateB - dateA
        }
      }

    return projectsCopy.sort(compare);
  } // endOfMethod



}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
