import { Module } from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { TestCaseProviders } from './test-case.providers';

@Module({
  providers: [
    TestCaseService,
    ...TestCaseProviders,
  ],

  exports : [
    TestCaseService,
    ...TestCaseProviders,
  ]


})
export class TestCaseModule {}
