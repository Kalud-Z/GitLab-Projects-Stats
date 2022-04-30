import { Injectable, Pipe } from '@angular/core';
import { Project } from '../../../shared/_models/project.model';
import { Group } from '../../../shared/_models/group.model';
import { FetchDataService } from '../../../shared/_services/fetch-data.service';
import { OrderByOption } from '../../../shared/_interfaces/dropdown-menu-option.interface';
import { Pipeline } from '../../../shared/_models/pipeline.model';
import { TestReport } from '../../../shared/_models/test-report.model';

@Injectable({
  providedIn: 'root',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectsDataService {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  allProjectsArray: Project[];

  constructor(private fetchDataService: FetchDataService) { }


  sortProjectsDescening(projects :Project[], orderByOption: OrderByOption): Project[] { // based on pipelines
    const compare = (a:Project , b:Project) => {
      if(orderByOption.id === 'pipelines')   { return b.stats.numberOfPipelines - a.stats.numberOfPipelines  }
      if(orderByOption.id === 'testReports') { return b.stats.numberOfTestReports - a.stats.numberOfTestReports  }
      if(orderByOption.id === 'avgDuration') { return b.stats.averageDurationOfPipelines - a.stats.averageDurationOfPipelines  }
    }

    return projects.sort(compare);
  }


  getAllProjectsArray() {
    const groups = this.fetchDataService.getGroups();
    this.allProjectsArray = this.createAllProjectsArray(groups);
    return this.allProjectsArray.slice();
  }


  getProjectByID(currentID: number): Project {
    let chosenProject: Project;
    this.getAllProjectsArray();
    this.allProjectsArray.forEach(project => {
      if(project.id === currentID) {
        chosenProject = project;
      }
    });
   return chosenProject;
  }


  getPipelineByID(project: Project , pipelineID: number): Pipeline {
    let returnedPipeline: Pipeline;
    project.pipelines.forEach(pipeline => {
      if(pipeline.id === pipelineID) { returnedPipeline = pipeline }
    });
    return returnedPipeline;
  }

  getTestReportByPipelineID(project: Project , pipelineID: number , pipelines?: Pipeline[]): TestReport {
    let targetPipelines: Pipeline[];
    let returnedPipeline: Pipeline;

    if(pipelines) {
      targetPipelines = pipelines;
    } else {
      targetPipelines = project.pipelines;
    }

    targetPipelines.forEach(pipeline => {
      if(pipeline.id === pipelineID) { returnedPipeline = pipeline }
    });

    return returnedPipeline.testReport;
  }


  private createAllProjectsArray(groups: Group[]): Project[] {
    console.log('this is groups : ' , groups);

    const finalArray: Project[] = [];
    let customerGroupIndex: number;
    groups.forEach((group , index) => {
      if(group.name !== 'Customers') { group.projects.forEach(project => finalArray.push(project)) }
      else { customerGroupIndex = index }
    });

    groups[customerGroupIndex].subGroups.forEach(group => {
      if(group.projects.length > 0) { group.projects.forEach(project => finalArray.push(project)) }
    });


    this.allProjectsArray = finalArray;
    return this.allProjectsArray.slice();
  }

}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
