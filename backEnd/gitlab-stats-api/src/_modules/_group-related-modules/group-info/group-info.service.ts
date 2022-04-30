import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {GroupInfoEntity} from './model/group-info.entity';
import {GroupInfoRepositoryToken} from './group-info.providers';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {ProjectEntity} from '../../_project-related-modules/project/model/project.entity';


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupInfoService {  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

  constructor(@Inject(GroupInfoRepositoryToken) private readonly groupInfoRepository: Repository<GroupInfoEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig) {}


  async saveGroupInfoEntity(targetProject: ProjectEntity): Promise<void> {
    const groupInfo     = new GroupInfoEntity();
    groupInfo.gitlabId  = targetProject.group.gitlabId;
    groupInfo.name      = targetProject.group.name;
    groupInfo.project   = targetProject;
    await this.groupInfoRepository.save(groupInfo as GroupInfoEntity)
  }


  //returns all projects . without their pipelines.
  async getAllGroupInfoEntries() {
    return await this.groupInfoRepository.createQueryBuilder('groupInfo').getMany()
  }



  async emptyTable() {
    await this.groupInfoRepository.createQueryBuilder().delete().from(GroupInfoEntity).execute();
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°









