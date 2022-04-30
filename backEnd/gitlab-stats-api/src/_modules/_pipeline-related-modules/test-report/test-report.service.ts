import {Inject, Injectable} from '@nestjs/common';
import {TestReportRepositoryToken} from './test-report.providers';
import {Repository} from 'typeorm';
import {TestReportEntity} from './model/test-report.entity';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {PipelineEntity} from '../pipeline/model/pipeline.entity';
import { TestSuiteService } from '../test-suite/test-suite.service';
import { DatabaseStateService } from '../../shared/services/database-state.service';

export interface TestSuitesObj {
  testReportId: number,
  testSuites: any
}

@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestReportService {
  arrayOfTestSuites_temp: TestSuitesObj[] = [];


  constructor(
    // private testSuiteService: TestSuiteService,
    @Inject(TestReportRepositoryToken) private readonly testReportRepository: Repository<TestReportEntity>,
    @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig,
    private databaseStateService : DatabaseStateService
  ) {}


  async saveTestReportEntity(returnedRawTestReport: any , currentPipelineEntry: PipelineEntity) {
    const testReport          = new TestReportEntity();
    testReport.error_count    = returnedRawTestReport.error_count ;
    testReport.failed_count   = returnedRawTestReport.failed_count ;
    testReport.skipped_count  = returnedRawTestReport.skipped_count ;
    testReport.success_count  = returnedRawTestReport.success_count ;
    testReport.total_count    = returnedRawTestReport.total_count ;
    testReport.total_time     = +returnedRawTestReport.total_time.toFixed(2)
    testReport.pipeline       = currentPipelineEntry;

    // console.log('now about to TestReportEntity ------------------------------------------');
    await this.testReportRepository.save(testReport as TestReportEntity);

    if(returnedRawTestReport.total_count !== 0) {
      await this.saveArrayOfTestSuites_temp(testReport , returnedRawTestReport);
    }
  }

  reset_arrayOfTestSuites_temp() {
    this.arrayOfTestSuites_temp = [];
  }
  async saveArrayOfTestSuites_temp(testReport , returnedRawTestReport) {
    // console.log('this is the test report . here you should find test suites : ', returnedRawTestReport);
    // console.log('returnedRawTestReport.test_suites : ', returnedRawTestReport.test_suites);
    // console.log('--------------------------------------------------------------------------------------------')
    return await new Promise(resolve => {
      let temp: TestSuitesObj = {
        testReportId : testReport.id,
        testSuites   : returnedRawTestReport.test_suites
      }

      // console.log('now saving arrayOfTestSuites_temp.push(xxx) -----------------------------------------');
      this.arrayOfTestSuites_temp.push(temp);
      resolve(true);
    });
  }

  //returns all projects . without their pipelines.
  async getAllTestReportEntries() {
    // return await this.testReportRepository.createQueryBuilder('testReport').getMany()

    let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    return await this.testReportRepository.createQueryBuilder('testReport')
      .leftJoinAndSelect("testReport.pipeline", "pipeline")
      .leftJoinAndSelect("pipeline.project", "project")
      .leftJoinAndSelect("project.group", "group")
      .where("group.tempData = :state", { state: tempData })
      .getMany()


    // => fetching projects
    // let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    // return await this.projectRepository.createQueryBuilder('project')
    //   .leftJoinAndSelect("project.group", "group")
    //   .where("group.tempData = :state", { state: tempData })
    //   .getMany()

    // => fetching pipelines :
    // let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    // return await  this.pipelineRepository.createQueryBuilder('pipeline')
    //   .leftJoinAndSelect("pipeline.project", "project")
    //   .leftJoinAndSelect("project.group", "group")
    //   .where("group.tempData = :state", { state: tempData })
    //   .leftJoinAndSelect("pipeline.testReport", "testReport")
    //   .getMany();
    //


  }


  async emptyTable() {
    await this.testReportRepository.createQueryBuilder().delete().from(TestReportEntity).execute();
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°










