import { Pipe, PipeTransform } from '@angular/core';
import { TableColumnsNames } from '../display-projects-list-view.component';
import { getDeepCloneOf } from '../../../../_other/global-shared-methods';
import { Project } from '../../../../_models/project.model';

@Pipe({
  name: 'sortProjectBasedOnColumn'
})


//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SortProjectBasedOnColumnPipe implements PipeTransform {

  transform(projectsToFilter: Project[], column: TableColumnsNames): Project[] {

    if(!column) { return projectsToFilter }

    let finalProjects = getDeepCloneOf(projectsToFilter);

    let compare = (a: Project , b: Project) => { return null }

    if(column === TableColumnsNames.TEST_COVERAGE) {
      compare = (a:Project , b:Project) => {
        let testCoverageA: number;
        let testCoverageB : number;
        if(b.stats.testCoverage) { testCoverageA = b.stats.testCoverage }  else { testCoverageA = 0 }
        if(a.stats.testCoverage) { testCoverageB = a.stats.testCoverage }  else { testCoverageB = 0 }

        return testCoverageA - testCoverageB
      }
    }

    if(column === TableColumnsNames.TOTAL_PIPELINES) {
      compare = (a: Project , b: Project) => { return b.pipelines.length - a.pipelines.length }
    }

    if(column === TableColumnsNames.REPO_SIZE) {
      compare = (a: Project , b: Project) => { return b.stats.totalRepoSize - a.stats.totalRepoSize }
    }

    if(column === TableColumnsNames.ARTIFACTS_SIZE) {
      compare = (a: Project , b: Project) => { return b.stats.artifactsSize - a.stats.artifactsSize }
    }

    if(column === TableColumnsNames.PIPELINES_AVG_DURATION) {
      // compare = (a: Project , b: Project) => { return b.avgDuration - a.pipelines. }
      compare = (a: Project , b: Project) => { return 0 }
    }

    if(column === TableColumnsNames.LAST_PIPELINE_DATE) {
      compare = (a: Project , b: Project) => {
        let dateA: number;
        let dateB : number;

        if(a.pipelines?.length > 0) { dateA = Date.parse(a.pipelines[0].stats.created_at) }  else { dateA = 0 }
        if(b.pipelines?.length > 0) { dateB = Date.parse(b.pipelines[0].stats.created_at) }  else { dateB = 0 }

        return dateB - dateA
      }
    }

    return finalProjects.sort(compare);
  }




}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
