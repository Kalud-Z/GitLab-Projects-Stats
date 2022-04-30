import { Module } from '@nestjs/common';
import {ProjectStatsProviders} from './project-stats.providers';
import {ProjectStatsService} from './project-stats.service';

@Module({
  providers: [
    ProjectStatsService,
    ...ProjectStatsProviders,
  ],

  exports : [
    ProjectStatsService,
    ...ProjectStatsProviders,
  ]


})
export class ProjectStatsModule {}
