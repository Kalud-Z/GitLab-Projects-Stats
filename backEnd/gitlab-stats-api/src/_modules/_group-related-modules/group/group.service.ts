import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {GitlabStatsServerConfig} from "../../database-config/gitlab-stats-server-config";
import {GITLABSTATS_CONFIG_TOKEN} from "../../database-config/databseConfigProviders";
import {GroupEntity} from './model/group.entity';
import {GroupRepositoryToken} from './group.providers';
import {DatabaseStateService} from "../../shared/services/database-state.service";


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupService {

  constructor(
    @Inject(GroupRepositoryToken) private readonly groupRepository: Repository<GroupEntity>,
    @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig,
    private databaseStateService : DatabaseStateService
  ){}


  async saveGroup(data : any, parentGroup: GroupEntity | null) {
    const groupEntry       = new GroupEntity();
    groupEntry.gitlabId    = data.id;
    groupEntry.name        = data.name;
    groupEntry.tempData    = this.setTempData();
    groupEntry.parentGroup = parentGroup

    await this.groupRepository.save(groupEntry as GroupEntity)
  }


  //returns all groups with their project property.
  async getAllGroups_forFrontEnd() {  //@oneToMany side of r.ship , is the one does the request to get the target array ...
    return await  this.groupRepository.createQueryBuilder('group')
      .where("group.tempData = :state", { state: false })

      .leftJoinAndSelect("group.projects", "project")
      .leftJoinAndSelect("group.subGroups", "subGroups")
      .leftJoinAndSelect("group.stats", "groupStats")

      .leftJoinAndSelect("project.stats", "projectStats")
      .leftJoinAndSelect("project.pipelines", "pipeline")
      // .orderBy("pipelineStats.created_at_rawDateFormat", "DESC") //ASC
      .orderBy("pipeline.id", "ASC") //ASC | DESC

      .leftJoinAndSelect("project.groupInfo", "groupInfo")

      .leftJoinAndSelect("pipeline.testReport", "testReport")
      .leftJoinAndSelect("testReport.test_suites", "test_suites")
      .leftJoinAndSelect("test_suites.test_cases", "test_cases")

      .leftJoinAndSelect("pipeline.stats", "pipelineStats")

      // .orderBy("pipelineStats.created_at_rawDateFormat", "DESC") //ASC

      .getMany();
  }


  async getAllGroups_forBackEnd() {  //@oneToMany side of r.ship , is the one does the request to get the target array ...
    return await  this.groupRepository.createQueryBuilder('group')
      //.where(flag == true ... / false)
      .leftJoinAndSelect("group.projects", "project")
      .leftJoinAndSelect("group.subGroups", "subGroups")
      .leftJoinAndSelect("group.stats", "groupStats")

      .leftJoinAndSelect("subGroups.projects", "subGroups_Projects")
      .leftJoinAndSelect("subGroups_Projects.stats", "subGroups_Projects_projectStats")

      .leftJoinAndSelect("project.stats", "projectStats")
      .leftJoinAndSelect("project.pipelines", "pipeline")
      .leftJoinAndSelect("project.groupInfo", "groupInfo")

      .leftJoinAndSelect("pipeline.testReport", "testReport")
      .leftJoinAndSelect("pipeline.stats", "pipelineStats")
      .getMany();
  }


  async getAllTempGroups_forBackEnd() {  //@oneToMany side of r.ship , is the one does the request to get the target array ...
    let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    return await this.groupRepository.createQueryBuilder('group')
      .where("group.tempData = :state", { state: tempData })
      .leftJoinAndSelect("group.projects", "project")
      .leftJoinAndSelect("group.subGroups", "subGroups")
      .leftJoinAndSelect("group.stats", "groupStats")

      .leftJoinAndSelect("subGroups.projects", "subGroups_Projects")
      .leftJoinAndSelect("subGroups_Projects.stats", "subGroups_Projects_projectStats")

      .leftJoinAndSelect("project.stats", "projectStats")
      .leftJoinAndSelect("project.pipelines", "pipeline")
      .leftJoinAndSelect("project.groupInfo", "groupInfo")

      .leftJoinAndSelect("pipeline.testReport", "testReport")
      .leftJoinAndSelect("pipeline.stats", "pipelineStats")
      .getMany();
  }

  async isTableEmpty() {
    let result =  await this.groupRepository.createQueryBuilder('group').getMany();
    if(result.length === 0) { return true  } else { return false }
  }


  async removeOutdatedData() {
    await this.groupRepository.createQueryBuilder()
      .delete()
      .from(GroupEntity)
      .where("tempData = :state", { state: false })
      .execute();
  }


  async removeErroredData() {
    await this.groupRepository.createQueryBuilder()
      .delete()
      .from(GroupEntity)
      .where("tempData = :state", { state: true })
      .execute();
  }





  async emptyTable() {
    await this.groupRepository.createQueryBuilder().delete().from(GroupEntity).execute();
  }


  private setTempData() {
    let result = this.databaseStateService.getIsDataBaseEmpty();
    if(result) { return false }
    else { return true }
  }

  async updateFlag() {
    await this.groupRepository.createQueryBuilder()
      .update(GroupEntity)
      .set({ tempData: false })
      .where("tempData = :state", { state: true })
      .execute();
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

