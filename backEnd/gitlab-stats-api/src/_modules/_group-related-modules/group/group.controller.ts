import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post} from '@nestjs/common';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {GroupService} from './group.service';
import {FetchDataService, FETCHING_GROUPS_ROUND} from './fetch-data.service';
import {AjaxService} from './ajax.service';
import {ProjectService} from '../../_project-related-modules/project/project.service';
import {DatabaseCrudService} from '../../shared/services/database-crud.service';
import * as moment from 'moment';
import {GroupEntity} from './model/group.entity';
import {HttpModifierHelpingService} from '../../http-service-modifier/http-modifier-helping.service';
import {IsOptional} from "class-validator";
import {DatabaseStateService} from "../../shared/services/database-state.service";
import { EmailService } from './email.service';
import { map } from 'rxjs/operators';



class fetchDataDto {
  @IsOptional()
  numberOfPipelines: number;

  @IsOptional()
  limitValue: number;
}


@Controller('group')
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupController {
  finishTime: Date = null;


  constructor(@Inject(GITLABSTATS_CONFIG_TOKEN) private readonly config: GitlabStatsServerConfig,
              private groupService: GroupService,
              private projectService: ProjectService,
              private databaseCrudService: DatabaseCrudService,
              private fetchDataService: FetchDataService,
              private ajaxService: AjaxService,
              private databaseStateService : DatabaseStateService,
              private emailService : EmailService,
              private httpModifierHelpingService : HttpModifierHelpingService)
  {
    // this.fetchData();  //trigger fetching the first time the backend is deployed. an after that th cron job will take over.
    this.httpModifierHelpingService.fetchDataNow$.subscribe(res => {
      if(res) {
        console.log('cronjob started  ...');
        this.fetchData();
      }
    });
  }


  @Post('send')
  sendEmail() {
    this.emailService.sendEmail();
  }



  @Get()
   async getData(): Promise<GroupEntity[]> {
    return await this.groupService.getAllGroups_forFrontEnd();
  }



  @Get('test')
  async getTestData() {
    return new Promise(resolve => {
      let gg = {data: 'The Backend is up and running.'};
      resolve(gg);
    });
  }


  @Get('time-last-fetch')
  async getTimeLastFetch() {
    let result: any;
    await this.ajaxService.dateLastUpdated.fetch().then(data => result = data.data);
    return new Promise(resolve =>  resolve({ date : result }));
  }



  @Delete()
  async deleteEverything() {
    await this.databaseCrudService.deleteEverything()
  }


  @Post()
  async fetchData(@Body() fetchDataBody?: fetchDataDto) {
    this.startingNewFetchLog();
    this.fetchDataService.setSomeErrorOccurred(false);
    await this.databaseCrudService.deleteErroredData();  //in case the previous Fetching was unexpectedly interrupted. (container was stopped for whatever reason ...)


    if(fetchDataBody?.numberOfPipelines) { this.ajaxService.setPipelinesResultsPerPage(fetchDataBody.numberOfPipelines) }
    if(fetchDataBody?.limitValue) { this.fetchDataService.setLimitValue(fetchDataBody.limitValue) }  //doesnt work.

    const motherGroupID = 4752824  //'w11k-devs' group
    let startTime: Date;
    const numOfSteps = 9;
    let alreadyFinalizedSteps = 0;

    try {
      console.log('now fetching groups ...   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchGroupsAndSaveThem(motherGroupID , FETCHING_GROUPS_ROUND.FIRST_ROUND)
        .finally(() => {
          console.log('fetchGroupsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching SubGroups ...  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchSubGroupsAndSaveThem()
        .finally(() => {
          console.log('fetchSubGroupsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching projects ...  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllProjectsOfAllGroupsAndSaveThem()
        .finally(() => {
          console.log('fetchAllProjectsOfAllGroupsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching pipelines ...  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllPipelinesOfAllProjectsAndSaveThem()
        .finally(() => {
          console.log('fetchAllPipelinesOfAllProjectsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching testReports ...  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllTestReportsAndSaveThem()
        .finally(() => {
          console.log('fetchAllTestReportsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.saveAllTestSuites()
        .finally(() => {
          console.log('saveAllTestSuites is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.saveAllTestCases()
        .finally(() => {
          console.log('saveAllTestCases is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching pipelineStats ...  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllPipelineStatsAndSaveThem()
        .finally(() => {
          console.log('fetchAllPipelineStatsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching group Info ...  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllGroupInfosAndSaveThem()
        .finally(() => {
          console.log('fetchAllGroupInfosAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching project stats ...  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllProjectStatsAndSaveThem()
        .finally(() => {
          console.log('fetchAllProjectStatsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      console.log('now fetching group stats ...  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      await this.fetchDataService.fetchAllGroupStatsAndSaveThem()
        .finally(() => {
          console.log('fetchAllGroupStatsAndSaveThem is Finalized ----------')
          alreadyFinalizedSteps++;
          console.log('alreadyFinalizedSteps : ' , alreadyFinalizedSteps);
        })

      if(!this.fetchDataService.didSomeErrorOccur()) {  //if no errors occurred
        console.log('now we are finished.  we are inside the last block . cause no error occurred')
        if(!this.databaseStateService.getIsDataBaseEmpty()) {
          console.log('now we are about to delete the outdated data.')
          await this.databaseCrudService.deleteOutdatedEntries()
          await this.databaseCrudService.updateDataFlag();
        }
        this.databaseStateService.setIsDataBaseEmpty(false);

        console.log('we are DONE');
        this.setLastUpdatedDate();
      }
      else { //if some error occurred
        console.log('some error occurred !');
        await this.databaseCrudService.deleteErroredData();
      }

    }

    catch(err) {
      console.log('we are in the outer catch block ????????????????? Error Occurred along the way. ERROR :' , err);
      await this.databaseCrudService.deleteErroredData();

      //send an email to Admin with logs and errors attached.
      // this.emailService.sendEmail();


      // the code execution will jump right to this block , the moment an error occurs :
      // *) a logic error . for example : try to get a property of an object that doesnt exist.
      // *) http/Promise error. some promise got rejected for whatever reason.
    }

    finally {
      console.log('now we are finished.  ___________________________________________________________')
    }

  } //endOfGetGroup






  //+++++++++++++++++++++++++++++++++++++++++++++  HELPING FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  private getDurationOfDataFetching(startTime: Date, finishTime: Date): number {
    let start = moment(startTime);
    let finish = moment(this.finishTime);
    return finish.diff(start , 'm') // 1
  }

  private setLastUpdatedDate() {
    this.finishTime = new Date();
    // this.groupService.
    // this.ajaxService.setDateLastUpdated(this.finishTime);
    this.ajaxService.dateLastUpdated.set(this.finishTime);
  }

  private startingNewFetchLog() {
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log(`°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°   STARTING NEW FETCH  (at ${new Date()})  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°`)
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°');
  }


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


