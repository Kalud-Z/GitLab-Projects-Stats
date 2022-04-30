import { Injectable } from '@nestjs/common';
import {AjaxService} from './ajax.service';

import {GroupService} from './group.service';
import {ProjectService} from '../../_project-related-modules/project/project.service';
import {GroupEntity} from './model/group.entity';
import {ProjectEntity} from '../../_project-related-modules/project/model/project.entity';
import {PipelineService} from '../../_pipeline-related-modules/pipeline/pipeline.service';
import {PipelineEntity} from '../../_pipeline-related-modules/pipeline/model/pipeline.entity';
import {TestReportService} from '../../_pipeline-related-modules/test-report/test-report.service';
import {PipelineStatsService} from '../../_pipeline-related-modules/pipeline-stats/pipeline-stats.service';
import {GroupInfoService} from '../group-info/group-info.service';
import {ProjectStatsService} from '../../_project-related-modules/project-stats/project-stats.service';
import {GroupStatsService} from '../group-stats/group-stats.service';
import {HttpModifierHelpingService} from '../../http-service-modifier/http-modifier-helping.service';
import { TestSuiteService } from '../../_pipeline-related-modules/test-suite/test-suite.service';
import { TestCaseService } from '../../_pipeline-related-modules/test-case/test-case.service';
import { TestReportEntity } from '../../_pipeline-related-modules/test-report/model/test-report.entity';
import { TestSuiteEntity } from '../../_pipeline-related-modules/test-suite/model/test-suite.entity';

const pLimit = require('p-limit')
const activatePausingInCaseTooManyRequest = true
export enum FETCHING_GROUPS_ROUND  { FIRST_ROUND = "FIRST_ROUND" , SECOND_ROUND = "SECOND_ROUND" }


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class FetchDataService {
  private timeToSleepInSeconds: number = 0
  limitValue = 6;
  limit = pLimit(this.limitValue);

  private someErrorOccurred = false;
  setSomeErrorOccurred(value: boolean) { this.someErrorOccurred = value }
  didSomeErrorOccur() { return this.someErrorOccurred }


  constructor(private ajaxService : AjaxService,
    private groupService: GroupService,
    private groupStatsService: GroupStatsService,
    private projectService: ProjectService,
    private projectStatsService: ProjectStatsService,
    private pipelineService: PipelineService,
    private testReportService: TestReportService,
    private pipelineStatsService: PipelineStatsService,
    private groupInfoService: GroupInfoService,
    private testSuiteService: TestSuiteService,
    private testCaseService: TestCaseService,
    private httpHelpingService : HttpModifierHelpingService)
  {
    this.httpHelpingService.waitTillMinuteIsUp$.subscribe(async timeInSeconds => {
      if(activatePausingInCaseTooManyRequest) {
        // this.timeToSleepInSeconds = timeInSeconds;
      }
    });
  }

  setLimitValue(num:number) {
    this.limitValue = num;
  }

   async fetchGroupsAndSaveThem(parentGroupId: number, whichRound : FETCHING_GROUPS_ROUND , currentParentGroup?: GroupEntity) {
    let targetGroupId: number;
    if(currentParentGroup) { targetGroupId = currentParentGroup.gitlabId }
    else { targetGroupId = parentGroupId }

     return await this.ajaxService.fetchAllSubgroups(targetGroupId)
       .then(async fetchingSubGroupsResponse => {
         for(const el of fetchingSubGroupsResponse.data) {
           const id   = el.id;
           const name = el.name;
           let parentGroup: GroupEntity | null;
           if(whichRound == FETCHING_GROUPS_ROUND.FIRST_ROUND) { parentGroup = null }
           else { parentGroup = currentParentGroup  }
           await this.groupService.saveGroup({id: id, name: name} , parentGroup);
         }
       })
       .catch(err => {
         this.someErrorOccurred = true;
         console.log('this is the error : ' , err);
         console.log('ERROR : error occurred while fetching Groups');
         throw new Error('????????  ERROR : error occurred while fetching Groups ???????? ');
       })
   }


   async fetchSubGroupsAndSaveThem() {
     await this.groupService.getAllTempGroups_forBackEnd()
      .then(async allGroups => {
        let allPromises = allGroups.map(group => this.fetchGroupsAndSaveThem(group.gitlabId, FETCHING_GROUPS_ROUND.SECOND_ROUND, group));
        return await Promise.all(allPromises)
      });
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async fetchAllProjectsOfAllGroupsAndSaveThem() {
    return  await this.groupService.getAllTempGroups_forBackEnd()
      .then(async groups => {
        let allPromises = groups.map(group => this.fetchAllProjectsOfOneGroupAndSaveThem(group));
        return await Promise.all(allPromises)
      });
  }


  async fetchAllProjectsOfOneGroupAndSaveThem(group : GroupEntity) {
    return await this.ajaxService.fetchAllProjectsWithinGroup(group.gitlabId)
      .then(async fetchingAllProjectsRes => {
        const projects = fetchingAllProjectsRes.data;
        for(const project of projects) {
          await this.projectService.saveProjectEntity(project , group);
        }
      })
      .catch(err => {
        this.someErrorOccurred = true;
        console.log('this is the error : ' , err);
        console.log('ERROR : error occurred while fetching Projects');
        throw new Error('????????  ERROR : error occurred while fetching Projects ????????');
      })
  } //endOfSaveProjectsOfOneGroup



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async fetchAllPipelinesOfAllProjectsAndSaveThem() {
    return await this.projectService.getAllProjects()
      .then(async projects => {
        let allPromises = projects.map(project => {
          return this.limit(() => this.saveAllPipelinesOfOneProject(project));
        });
        return await Promise.all(allPromises)
      });
  }


  private async saveAllPipelinesOfOneProject(project: ProjectEntity) {
    return await this.ajaxService.fetchAllPipelinesOfProject(project.gitlabId)
      .then(async fetchingAllPipelinesRes => {
        const pipelines = fetchingAllPipelinesRes.data;
        for(const pipeline of pipelines) { await this.pipelineService.savePipelineEntity(pipeline, project) }
      })
      .catch(err => {
        this.someErrorOccurred = true;
        console.log('this is project : ' , project.name);
        console.log('ERROR : error occurred while fetching Pipelines in project');
        console.log('this is the error : ' , err);
        throw new Error('????????  ERROR : error occurred while fetching Pipelines in project :  ????????');
      })
  }



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



  async fetchAllTestReportsAndSaveThem() {
    this.testReportService.reset_arrayOfTestSuites_temp();
    return await this.pipelineService.getAllPipelinesWithTheirRelations()
      .then(async pipelines => {
        let allPromises = pipelines.map(pipeline => {
          return this.limit(() => this.saveTestReportOfOnePipeline(pipeline));
        });
        return await Promise.all(allPromises)
      })
  }


  private async saveTestReportOfOnePipeline(pipeline: PipelineEntity) {
    return await this.ajaxService.fetchTestReport(pipeline.project.gitlabId , pipeline.gitlabId)
      .then(async returnedTestReport => {
        if(returnedTestReport.data.total_count !== 0) {  //because why save a 'empty' testReport. but if you wanna do this , you gotta change some stuff in some of the following dependant steps.
          const testReport = returnedTestReport.data;
          return await this.testReportService.saveTestReportEntity(testReport , pipeline);
        }
      })
      .catch(err => {
        this.someErrorOccurred = true;
        console.log('this is the project : ' , pipeline.project.name);
        console.log('ERROR : error occurred while fetching Test Reports');
        console.log('this is the error : ' , err);
        throw new Error('????????  ERROR : error occurred while fetching Test Reports ????????');
      })
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async saveAllTestSuites() {
    this.testSuiteService.reset_arrayOfTestCases_temp();
    return await this.testReportService.getAllTestReportEntries()
      .then(async testReports => {
        let allPromises = testReports.map(testReport => {
          return this.limit(() => this.saveTestSuitesOfOneTestReport(testReport));
        });
        return await Promise.all(allPromises)
      })
  }


  private async saveTestSuitesOfOneTestReport(testReport: TestReportEntity) {
    const gg = this.testReportService.arrayOfTestSuites_temp.find(el => el.testReportId === testReport.id);
    const theRightTestSuites = gg.testSuites;
    if(theRightTestSuites?.length > 0) {
      for(const testSuite of theRightTestSuites) {
        await this.testSuiteService.saveTestSuiteEntity(testReport , testSuite)
          .catch(err => {
            this.someErrorOccurred = true;
            console.log('ERROR : error occurred while saving test suite');
            console.log('this is the error : ' , err);
            throw new Error('????????  ERROR : error occurred while saving test suite ????????');
          });
      }
    }
  }



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async saveAllTestCases() {
    return await this.testSuiteService.getAllTestSuitesEntries()
      .then(async testSuites => {
        let allPromises = testSuites.map(testSuite => {
          return this.limit(() => this.saveTestCasesOfOneTestSuite(testSuite));
        });
        return await Promise.all(allPromises)
      });
  }


  private async saveTestCasesOfOneTestSuite(testSuite: TestSuiteEntity) {
    const gg = this.testSuiteService.arrayOfTestCases_temp.find(el => el.testSuiteId === testSuite.id);
    if(!gg) {
      console.log('testSuite : ' , testSuite)
      console.log('this.testSuiteService.arrayOfTestCases_temp : ' , this.testSuiteService.arrayOfTestCases_temp);
    }

    const theRightTestCases  = gg.testCases;

    if(theRightTestCases?.length > 0) {
      for(const testCase of theRightTestCases) {
        await this.testCaseService.saveTestCaseEntity(testSuite , testCase)
          .catch(err => {
            this.someErrorOccurred = true;
            console.log('ERROR : error occurred while saving test case');
            console.log('this is the error : ' , err);
            throw new Error('????????  ERROR : error occurred while saving test case ????????');
          });
      }
    }
  }




  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



  async fetchAllPipelineStatsAndSaveThem() {
    return await this.pipelineService.getAllPipelinesWithTheirRelations()
      .then(async pipelines => {
        let allPromises = pipelines.map(pipeline => {
          return this.limit(() => this.savePipelineStatsOfOnePipeline(pipeline));
        });
        return  await Promise.all(allPromises)
      });
  }


  private async savePipelineStatsOfOnePipeline(pipeline: PipelineEntity) {
    return await this.ajaxService.fetchDetailsOfPipeline(pipeline.project.gitlabId , pipeline.gitlabId)
      .then(async returnedDetailsOfPipeline => {
        const pipelineDetails = returnedDetailsOfPipeline.data;
        // console.log()
        await this.pipelineStatsService.savePipelineStatsEntity(pipelineDetails , pipeline);
      })
      .catch(err => {
        this.someErrorOccurred = true;
        console.log('this is the project : ' , pipeline.project.name);
        console.log('ERROR : error occurred while fetching Details of pipelines');
        console.log('this is the error : ' , err);
        throw new Error('????????  ERROR : error occurred while fetching Details of pipelines ????????');
      })
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async fetchAllGroupInfosAndSaveThem() {
    return await this.projectService.getAllProjectsWithTheirRelations()
      .then(async projects => {
        let allPromises = projects.map(project => this.saveGroupInfoOfOneProject(project));
        return await Promise.all(allPromises)
      });
  }


  private async saveGroupInfoOfOneProject(project: ProjectEntity) {
    await this.groupInfoService.saveGroupInfoEntity(project);
  }



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async fetchAllProjectStatsAndSaveThem() {
    return await this.projectService.getAllProjectsWithTheirRelations()
      .then(async projects => {
        let allPromises = projects.map(project => this.saveProjectStatsOfOneProject(project));
        return await Promise.all(allPromises)
      });
  }


  private async saveProjectStatsOfOneProject(project: ProjectEntity) {
    return await this.ajaxService.fetchProjectRepoAndArtifactsSize(project.gitlabId)
        .then(async returnedDetailsOfProject => {
          const projectDetailsRaw = returnedDetailsOfProject.data;
          await this.projectStatsService.saveProjectStatsEntity(projectDetailsRaw, project);
        })
        .catch(err => {
          this.someErrorOccurred = true;
          console.log('this is the project : ' , project.name);
          console.log('ERROR : error occurred while fetching Stats of project');
          console.log('this is the error : ' , err);
          throw new Error('????????  ERROR : error occurred while fetching Stats of project ????????');
        })
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  async fetchAllGroupStatsAndSaveThem() {
    return await this.groupService.getAllTempGroups_forBackEnd()
      .then(async groups => {
        let allPromises = groups.map(group => this.saveGroupStatsOfOneProject(group));
        return await Promise.all(allPromises)
      });
  }

  private async saveGroupStatsOfOneProject(group: GroupEntity) {
    await this.groupStatsService.saveGroupStatsEntity(group);
  }


  private async sleeper(ms): Promise<undefined> {
    if(this.timeToSleepInSeconds > 0) {
      console.log(`we gonna sleep now for :  , ${ms} ms`)
    }
    this.timeToSleepInSeconds = 0;
    return await new Promise(resolve => setTimeout(() => resolve(), ms * 1000));
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



