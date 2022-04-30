import { Module } from '@nestjs/common';
import {GroupStatsService} from './group-stats.service';
import {GroupStatsProviders} from './group-stats.providers';

@Module({
  // imports : [ //TODO : why do we need to import these in each feature module ?
  //   DatabaseModule,
  //   ConfigModule,
  // ],
  providers: [
    GroupStatsService,
    ...GroupStatsProviders,
  ],

  exports : [
    GroupStatsService,
    ...GroupStatsProviders,
  ]


})
export class GroupStatsModule {}
