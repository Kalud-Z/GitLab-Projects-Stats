import { Pipe, PipeTransform } from '@angular/core';
import { PIPELINES_COLUMN_FILTER_OPTIONS} from '../display-projects-list-view.component';
import { Project } from '../../../../_models/project.model';

@Pipe({
  name: 'pipelinesColumnFilter'
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelinesColumnFilterPipe implements PipeTransform {


  transform(projectsToFilter: Project[], option: PIPELINES_COLUMN_FILTER_OPTIONS): Project[] {
    if(!option) { return projectsToFilter}

    let finalArray: Project[];

    if(option === PIPELINES_COLUMN_FILTER_OPTIONS.HIDE_PROJECTS_WITH_NO_PIPELINES) {
      finalArray = this.hideProjectsWithNoPipelines(projectsToFilter);
    }
    else if(option === PIPELINES_COLUMN_FILTER_OPTIONS.SHOW_ONLY_PROJECTS_WITH_NO_PIPELINES){
      finalArray = this.getOnlyProjectsWithNoPipelines(projectsToFilter);
    }

    return finalArray;
  }


  private hideProjectsWithNoPipelines(projects: Project[]): Project[] {
    const finalArray: Project[] = [];
    projects.forEach(project => {
      if(project.pipelines.length !== 0) { finalArray.push(project) }
    });

    return finalArray;
  }

  private getOnlyProjectsWithNoPipelines(projects: Project[]): Project[] {
    const finalArray: Project[] = [];
    projects.forEach(project => {
      if(project.pipelines.length === 0) { finalArray.push(project) }
    });

    return finalArray;
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
