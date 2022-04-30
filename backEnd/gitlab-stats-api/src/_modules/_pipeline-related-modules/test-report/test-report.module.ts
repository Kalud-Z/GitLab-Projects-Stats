import { forwardRef, Module } from '@nestjs/common';
import {TestReportService} from './test-report.service';
import {TestReportProviders} from './test-report.providers';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports : [
    forwardRef(() => SharedModule),
  ],
  providers: [
    TestReportService,
    ...TestReportProviders,
  ],
  exports : [
    TestReportService,
    ...TestReportProviders,
  ]


})
export class TestReportModule {}
