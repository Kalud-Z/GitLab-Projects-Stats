import { Pipe, PipeTransform } from '@angular/core';
import { Project } from "../../../../_models/project.model";
import { ProjectsSharedMethods } from "../../../../../projects/_shared/_other/projects-shared-methods";
import {  howFarWeGoBack,  getNumberOfHowFarWeGoBack } from "../../../_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component";
import { getDeepCloneOf } from '../../../../_other/global-shared-methods';

@Pipe({
  name: 'howFarWeGoBack',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class HowFarWeGoBackPipe implements PipeTransform {

  transform(projects: Project[], howFarWeGoBackInDays: howFarWeGoBack): Project[] {
    const weGoBackXXXDays = getNumberOfHowFarWeGoBack(howFarWeGoBackInDays);
    const finalArrayOfProjects = getDeepCloneOf(projects);

    finalArrayOfProjects.forEach(project => {
        project.pipelines = ProjectsSharedMethods.getNumberOfPipelinesInLastXXXDays(project , weGoBackXXXDays)[0]
        // this.adjustTestCoverage(project);
    })

    if(howFarWeGoBackInDays === howFarWeGoBack.ALL_TIME) { return projects }
    else { return finalArrayOfProjects }

  }
}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
