import { Pipe, PipeTransform } from '@angular/core';
import { Project } from "../../../../_models/project.model";
import { cardsTypeOptionsIDs } from "../../../../../projects/_shared/_other/projects-shared-properties";
import { getDeepCloneOf } from '../../../../_other/global-shared-methods';
import { sortByOptions } from '../../../_dropdown-menus/sort-dashboard-dropdown/sort-dashboard-dropdown.component';


@Pipe({
  name: 'sortProjectsBasedOnXXX',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SortProjectsBasedOnXXXPipe implements PipeTransform {

  transform(projects: Project[], type: cardsTypeOptionsIDs | sortByOptions): Project[] {
    const projectsCopy = getDeepCloneOf(projects);

    const compare = (a:Project , b:Project) => {
      if(type === cardsTypeOptionsIDs.Pipelines) { return b.stats.numberOfPipelines - a.stats.numberOfPipelines }


      if(type === cardsTypeOptionsIDs.TestReports) {
        if(a.pipelines.length === 0) { a.stats.numberOfTestReports = 0 }
        if(b.pipelines.length === 0) { b.stats.numberOfTestReports = 0 }
        return b.stats.numberOfTestReports - a.stats.numberOfTestReports
      }


      if(type === cardsTypeOptionsIDs.TestCoverage) {
        if(a.pipelines.length === 0) { a.stats.testCoverage = 0 }
        if(b.pipelines.length === 0) { b.stats.testCoverage = 0 }
        return b.stats.testCoverage - a.stats.testCoverage;
      }
    }

    return projectsCopy.sort(compare);
  } // endOfMethod


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
