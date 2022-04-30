import { forwardRef, Module } from '@nestjs/common';
import { TestSuiteService } from './test-suite.service';
import { TestSuiteProviders } from './test-suite.providers';
import { TestCaseModule } from '../test-case/test-case.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports : [
    TestCaseModule,
    forwardRef(() => SharedModule)
  ],

  providers: [
    TestSuiteService,
    ...TestSuiteProviders,
  ],

  exports : [
    TestSuiteService,
    ...TestSuiteProviders,
  ]

})
export class TestSuiteModule {}
