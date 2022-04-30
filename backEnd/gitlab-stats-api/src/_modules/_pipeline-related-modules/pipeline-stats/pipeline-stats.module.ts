import { Module } from '@nestjs/common';
import {PipelineStatsService} from './pipeline-stats.service';
import {PipelineStatsProviders} from './pipeline-stats.providers';

@Module({
  providers: [
    PipelineStatsService,
    ...PipelineStatsProviders,
  ],

  exports : [
    PipelineStatsService,
    ...PipelineStatsProviders,
  ]

})
export class PipelineStatsModule {
}
