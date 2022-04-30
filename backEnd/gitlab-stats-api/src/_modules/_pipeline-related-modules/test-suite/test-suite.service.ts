import { Inject, Injectable } from '@nestjs/common';
import { TestSuiteRepositoryToken } from './test-suite.providers';
import { Repository } from 'typeorm';
import { GITLABSTATS_CONFIG_TOKEN } from '../../database-config/databseConfigProviders';
import { GitlabStatsServerConfig } from '../../database-config/gitlab-stats-server-config';
import { TestSuiteEntity } from './model/test-suite.entity';
import { TestReportEntity } from '../test-report/model/test-report.entity';
import { TestCaseService } from '../test-case/test-case.service';
import { DatabaseStateService } from '../../shared/services/database-state.service';


export interface TestCasesObj {
  testSuiteId: number,
  testCases: any
}

@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestSuiteService {
  arrayOfTestCases_temp: TestCasesObj[] = [];

  constructor(
    private testCaseService: TestCaseService,
    @Inject(TestSuiteRepositoryToken) private readonly testSuiteRepository: Repository<TestSuiteEntity>,
    @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig,
    private databaseStateService : DatabaseStateService
    ) {}


  async saveTestSuiteEntity(testReportSaved: TestReportEntity , test_suiteRaw: any) {
    const testSuiteSaved           = new TestSuiteEntity();
    testSuiteSaved.total_time      = +test_suiteRaw.total_time.toFixed(2);
    testSuiteSaved.total_count     = test_suiteRaw.total_count;
    testSuiteSaved.error_count     = test_suiteRaw.error_count;
    testSuiteSaved.failed_count    = test_suiteRaw.failed_count;
    testSuiteSaved.name            = test_suiteRaw.name;
    testSuiteSaved.skipped_count   = test_suiteRaw.skipped_count;
    testSuiteSaved.success_count   = test_suiteRaw.success_count;
    testSuiteSaved.testReport      = testReportSaved

    // console.log('now about to save TestSuiteEntity -------------------------------------------------------------------------------')
    await this.testSuiteRepository.save(testSuiteSaved as TestSuiteEntity);
    await this.saveArrayOfTestCases_temp(testSuiteSaved , test_suiteRaw);
  }


  reset_arrayOfTestCases_temp() {
    console.log('reset_arrayOfTestCases_temp is called')
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    this.arrayOfTestCases_temp = [];
  }

  async saveArrayOfTestCases_temp(testSuiteSaved , test_suiteRaw) {
    return await new Promise(resolve => {
      let temp: TestCasesObj = {
        testSuiteId : testSuiteSaved.id,
        testCases   : test_suiteRaw.test_cases
      }

      // console.log('now saving arrayOfTestCases_temp.push(xxx)  ------------------------------------------------------');
      this.arrayOfTestCases_temp.push(temp);
      resolve(true);
    });
  }


  async getAllTestSuitesEntries() {
    // return await this.testSuiteRepository.createQueryBuilder('testSuite').getMany();

    let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    return await this.testSuiteRepository.createQueryBuilder('testSuite')
      .leftJoinAndSelect("testSuite.testReport", "testReport")
      .leftJoinAndSelect("testReport.pipeline", "pipeline")
      .leftJoinAndSelect("pipeline.project", "project")
      .leftJoinAndSelect("project.group", "group")
      .where("group.tempData = :state", { state: tempData })
      .getMany()
  }


  async emptyTable() {
    await this.testSuiteRepository.createQueryBuilder().delete().from(TestSuiteEntity).execute();
  }


  async saveAllTestSuites(testReportSaved: TestReportEntity , testReportRaw: any) {
    // console.log('now saving test suites $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    // console.log('returnedRawTestReport : ' , returnedRawTestReport)
    testReportRaw.test_suites.forEach(test_suite => {
      this.saveTestSuiteEntity(testReportSaved , test_suite);
    });
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

