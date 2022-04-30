import { Component, Input} from '@angular/core';
import { Project } from '../../_models/project.model';
import { formatTestCoverage } from '../../_other/global-shared-methods';

@Component({
  selector: 'app-test-coverage-banner',
  templateUrl: './test-coverage-banner.component.html',
  styleUrls: ['./test-coverage-banner.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestCoverageBannerComponent  {
  @Input() project: Project;
  @Input() inTableListView = false;

  getClass(className) {
    let returnedClass: string;
    const extraClass = '';
    if(this.project.stats.areTestCoveragesAvailable && this.project.pipelines.length > 0) {
      returnedClass = className + '-success';
    } else {
      returnedClass = className + '-undefined'
    }

    return returnedClass + ' ' + extraClass;
  }


  getTestCoverage(project: Project): string {
    // if(project.pipelines?.length > 0) {
    //   let lastPipelineTestCov = project.pipelines[0].stats.testCoverage;
    //   if(lastPipelineTestCov) { return lastPipelineTestCov + '%' } else { return '---' }
    // }
    //
    // if(project.name == 'angular-gitlab-template') {
    //   console.log(project.stats)
    //   console.log(project.pipelines)
    // }
    return formatTestCoverage(project.stats.testCoverage)
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

