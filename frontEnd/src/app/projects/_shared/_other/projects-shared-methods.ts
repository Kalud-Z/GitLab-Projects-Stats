import { Project } from '../../../shared/_models/project.model';
import * as moment from 'moment';
import { Pipeline } from '../../../shared/_models/pipeline.model';



// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectsSharedMethods {

  static hideProjectsWithNoPipelines(flag: boolean, allProjectsUnfiltered: Project[] , allProjects: Project[]): Project[] {
    if(flag) {
      const finalArray : Project[] = [];
      allProjectsUnfiltered.forEach(project => {
        if(project.stats.numberOfPipelines > 0) { finalArray.push(project) }
      });
      allProjects = finalArray;
    }
    else { allProjects = allProjectsUnfiltered }

    return allProjects;
  } // endOfMethod

  static hideProjectsWithNoTestReports(flag: boolean, allProjectsUnfiltered: Project[] , allProjects: Project[]): Project[] {
    if(flag) {
      const finalArray : Project[] = [];
      allProjectsUnfiltered.forEach(project => {
        if(project.stats.numberOfTestReports > 0) { finalArray.push(project) }
      });
      allProjects = finalArray;
    }
    else { allProjects = allProjectsUnfiltered }

    return allProjects;
  } // endOfMethod

  static hideProjectsWithZeroAvgDurations(flag: boolean, allProjectsUnfiltered: Project[] , allProjects: Project[]): Project[] {
    if(flag) {
      const finalArray : Project[] = [];
      allProjectsUnfiltered.forEach(project => {
        if(project.stats.averageDurationOfPipelines > 0) { finalArray.push(project) }
      });
      allProjects = finalArray;
    }
    else { allProjects = allProjectsUnfiltered }

    return allProjects;
  } // endOfMethod

  static showOnlyProjectsWithNoPipelines(flag: boolean, allProjectsUnfiltered: Project[] , allProjects: Project[]): Project[] {
    if(flag) {
      const finalArray : Project[] = [];
      allProjectsUnfiltered.forEach(project => {
        if(project.stats.numberOfPipelines === 0) { finalArray.push(project) }
      });
      allProjects = finalArray;
    }
    else { allProjects = allProjectsUnfiltered }

    return allProjects;
  } // endOfMethod

  static showOnlyProjectsWithNoTestReports(flag: boolean, allProjectsUnfiltered: Project[] , allProjects: Project[]): Project[] {
    if(flag) {
      const finalArray : Project[] = [];
      allProjectsUnfiltered.forEach(project => {
        if(project.stats.numberOfTestReports === 0) { finalArray.push(project) }
      });
      allProjects = finalArray;
    }
    else { allProjects = allProjectsUnfiltered }

    return allProjects;
  }

  static showOnlyProjectsWithNoAvgDurations(flag: boolean, allProjectsUnfiltered: Project[] , allProjects: Project[]): Project[] {
    if(flag) {
      const finalArray : Project[] = [];
      allProjectsUnfiltered.forEach(project => {
        if(project.stats.averageDurationOfPipelines === 0) { finalArray.push(project) }
      });
      allProjects = finalArray;
    }
    else { allProjects = allProjectsUnfiltered }

    return allProjects;
  }

  static getNumberOfPipelinesInLastXXXDays(project: Project, numberOfLastDays: number): [Pipeline[] ,  number , number] {
    let count = 0;
    let avgDuration: number;
    const finalArrayOfPipelines: Pipeline[] = [];

    if(project.pipelines?.length > 0) {
      project.pipelines.forEach(pipeline => {
        if(new Date(pipeline.stats.created_at_rawDateFormat) > moment().subtract(numberOfLastDays, 'days').toDate()) {
          count++;
          finalArrayOfPipelines.push(pipeline);
        }
      });
    }
    else { count = 0 }


    avgDuration = this.getAvgDuration(finalArrayOfPipelines);
    return [finalArrayOfPipelines, count , avgDuration]
  }

  static getNumberOfTestReportsInLastXXXDays(project: Project, numberOfLastDays: number): number {
    let count = 0;
    if(project.pipelines?.length > 0) {
      project.pipelines.forEach(pipeline => {
        if(new Date(pipeline.stats.created_at_rawDateFormat)  > moment().subtract(numberOfLastDays, 'days').toDate()) {
          if(pipeline.stats.isTestReportAvailable) { count++ }
        }
      });
    }
    else { count = 0 }

    return count
  }

  static convertSecondsToMinutes(durationInSeconds : number): number {
    const final = durationInSeconds / 60;
    return +final.toFixed(2);
  }

  static getAverageDurationOfPipelines(pipelines: Pipeline[]): number {
    let sumAllDuration = 0;
    let result: number;

    if(pipelines.length > 0) {
      pipelines.forEach(pipeline => {
        if(pipeline.stats.duration) { sumAllDuration += pipeline.stats?.duration }
      });

      result =  +(sumAllDuration/pipelines.length).toFixed(0);
    }

    else { result = 0 }

    return  ProjectsSharedMethods.convertSecondsToMinutes(result);
  }

  private static getAvgDuration(pipelines : Pipeline[]): number {
    return  ProjectsSharedMethods.getAverageDurationOfPipelines(pipelines);
  }



}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

