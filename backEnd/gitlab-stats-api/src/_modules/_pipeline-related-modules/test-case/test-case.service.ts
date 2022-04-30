import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GITLABSTATS_CONFIG_TOKEN } from '../../database-config/databseConfigProviders';
import { GitlabStatsServerConfig } from '../../database-config/gitlab-stats-server-config';
import { TestReportEntity } from '../test-report/model/test-report.entity';
import { TestCaseRepositoryToken } from './test-case.providers';
import { TestCaseEntity } from './model/test-case.entity';
import { TestSuiteEntity } from '../test-suite/model/test-suite.entity';


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestCaseService {

  constructor(@Inject(TestCaseRepositoryToken) private readonly testCaseRepository: Repository<TestCaseEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig) {}


  async saveTestCaseEntity(testSuiteSaved: TestSuiteEntity ,test_case: any) {
    const testCase            = new TestCaseEntity();
    testCase.classname        = test_case.classname;
    testCase.execution_time   = +test_case.execution_time.toFixed(2)
    testCase.name             = test_case.name;
    testCase.status           = test_case.status;
    testCase.system_output    = test_case.system_output;
    testCase.testSuite        = testSuiteSaved;

    // console.log('now about to save a test case -------------------------------------------------------------------------------')
    await this.testCaseRepository.save(testCase as TestCaseEntity);
  }


  async getAllTestSuitesEntries() {
    return await this.testCaseRepository.createQueryBuilder('testCase').getMany()
  }


  async emptyTable() {
    await this.testCaseRepository.createQueryBuilder().delete().from(TestCaseEntity).execute();
  }


  async saveAllTestCases(testSuiteSaved: TestSuiteEntity , returnedTestSuite: any) {
    returnedTestSuite.test_cases.forEach(test_case => {
      this.saveTestCaseEntity(testSuiteSaved , test_case);
    });
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

