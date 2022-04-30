import {forwardRef, HttpModule, Module} from '@nestjs/common';
import {GroupService} from './group.service';
import {GroupProviders} from './group.providers';
import {GroupController} from './group.controller';
import {ProjectModule} from '../../_project-related-modules/project/project.module';
import { AjaxService } from './ajax.service';
import { FetchDataService } from './fetch-data.service';
import {SharedModule} from '../../shared/shared.module';
import {PipelineModule} from '../../_pipeline-related-modules/pipeline/pipeline.module';
import {TestReportModule} from '../../_pipeline-related-modules/test-report/test-report.module';
import {PipelineStatsModule} from '../../_pipeline-related-modules/pipeline-stats/pipeline-stats.module';
import {GroupInfoModule} from '../group-info/group-info.module';
import {ProjectStatsModule} from '../../_project-related-modules/project-stats/project-stats.module';
import {GroupStatsModule} from '../group-stats/group-stats.module';
import {HttpServiceModifierModule} from '../../http-service-modifier/http-service-modifier.module';
import { TestSuiteModule } from '../../_pipeline-related-modules/test-suite/test-suite.module';
import { TestCaseModule } from '../../_pipeline-related-modules/test-case/test-case.module';
import { EmailService } from './email.service';

@Module({
  imports : [
    HttpServiceModifierModule,
    HttpModule,
    ProjectModule,
    ProjectStatsModule,
    PipelineModule,
    TestReportModule,
    TestSuiteModule,
    TestCaseModule,
    PipelineStatsModule,
    GroupInfoModule,
    GroupStatsModule,
    forwardRef(() => SharedModule),
  ],
  providers: [
    GroupService,
    ...GroupProviders,
    AjaxService,
    FetchDataService,
    EmailService,
  ],
  controllers: [
    GroupController
  ],
  exports : [
    GroupService
  ]

})
export class GroupModule {}

