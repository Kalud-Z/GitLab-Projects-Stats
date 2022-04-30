import { Module } from '@nestjs/common';
import {GroupInfoService} from './group-info.service';
import {GroupInfoProviders} from './group-info.providers';


@Module({
  providers: [
    GroupInfoService,
    ...GroupInfoProviders,
  ],

  exports : [
    GroupInfoService,
    ...GroupInfoProviders,
  ]

})
export class GroupInfoModule {}
