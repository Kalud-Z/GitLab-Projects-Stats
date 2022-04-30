import { Pipe, PipeTransform } from '@angular/core';
import { TEST_COVERAGE_COLUMN_FILTER_OPTIONS } from '../display-projects-list-view.component';
import { Project } from '../../../../_models/project.model';

@Pipe({
  name: 'testCoverageColumnFilter'
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestCoverageColumnFilterPipe implements PipeTransform {

  transform(projectsToFilter: Project[], option: TEST_COVERAGE_COLUMN_FILTER_OPTIONS): Project[] {
    if(!option) { return projectsToFilter}

    let finalArray: Project[];

    if(option === TEST_COVERAGE_COLUMN_FILTER_OPTIONS.HIDE_PROJECTS_WITH_NO_TEST_COVERAGE) {
      finalArray = this.hideProjectsWithNoTestCoverage(projectsToFilter);
    }
    else if(option === TEST_COVERAGE_COLUMN_FILTER_OPTIONS.SHOW_ONLY_PROJECTS_WITH_NO_TEST_COVERAGE){
      finalArray = this.showOnlyProjectsWithNoTestCoverage(projectsToFilter);
    }

    return finalArray;
  }


  private hideProjectsWithNoTestCoverage(projects: Project[]): Project[] {
    const finalArray: Project[] = [];
    projects.forEach(project => {
      if(project.stats.testCoverage) { finalArray.push(project) }
    });

    return finalArray;
  }

  private showOnlyProjectsWithNoTestCoverage(projects: Project[]): Project[] {
    const finalArray: Project[] = [];
    projects.forEach(project => {
      if(!project.stats.testCoverage) { finalArray.push(project) }
    });

    return finalArray;
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
