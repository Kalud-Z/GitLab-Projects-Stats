import { Pipe, PipeTransform } from '@angular/core';
import { Project } from "../../../../_models/project.model";
import { cardsTypeOptionsIDs } from "../../../../../projects/_shared/_other/projects-shared-properties";
import { getDeepCloneOf } from '../../../../_other/global-shared-methods';

@Pipe({
  name: 'showOnlyEmptyCards',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ShowOnlyEmptyCardsPipe implements PipeTransform { // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

  transform(projects: Project[], cardType : cardsTypeOptionsIDs, flag: boolean): Project[] {
    if(flag) {
      const projectsCopy: Project[] = getDeepCloneOf(projects);
      const finalProjectsToReturn: Project[] = [];

      if(cardType === cardsTypeOptionsIDs.Pipelines) {
        projectsCopy.forEach(project => {
          if(project.stats.numberOfPipelines === 0) { finalProjectsToReturn.push(project) }
        })
      }

      if(cardType === cardsTypeOptionsIDs.TestCoverage) {
        projectsCopy.forEach(project => {
          if(!project.stats.areTestCoveragesAvailable) { finalProjectsToReturn.push(project) }
        })
      }

      if(cardType === cardsTypeOptionsIDs.TestReports) {
        projectsCopy.forEach(project => {
          if(!project.stats.areTestsAvailable) { finalProjectsToReturn.push(project) }
        })
      }

      return finalProjectsToReturn;
    }
    else {
      return projects;
    }
  }



} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
