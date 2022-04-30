import {Inject, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {GroupStatsEntity} from './model/groupStats.entity';
import {GroupStatsRepositoryToken} from './group-stats.providers';
import {GroupEntity} from '../group/model/group.entity';


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class GroupStatsService {  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  groupStats: GroupStatsEntity;


  constructor(@Inject(GroupStatsRepositoryToken) private readonly groupStatsRepository: Repository<GroupStatsEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig) {}


  async saveGroupStatsEntity(currentGroupEntry: GroupEntity): Promise<void> {
    this.groupStats                             = new GroupStatsEntity();
    this.groupStats.isThereSubgroups            = this.isThereSubGroups(currentGroupEntry);
    this.groupStats.numberOfProjects            = this.getTotalNumberOfProjects(currentGroupEntry);
    this.groupStats.testCoverageOfAllProjects   = this.getTestCoverageOfAllProjects(currentGroupEntry);
    this.groupStats.numberOfPipelines           = this.getNumberOfPipelines(currentGroupEntry);
    this.groupStats.numberOfTestReports         = this.getNumberOfTestReports(currentGroupEntry);
    this.groupStats.group                       =  currentGroupEntry;

    await this.groupStatsRepository.save(this.groupStats as GroupStatsEntity);
  }


  async getAllGroupStatsEntries() {
    return await this.groupStatsRepository.createQueryBuilder('groupStats').getMany()
  }



  async emptyTable() {
    await this.groupStatsRepository.createQueryBuilder().delete().from(GroupStatsEntity).execute();
  }


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++  HELPING FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  private isThereSubGroups(currentGroupEntry: GroupEntity): boolean {
    const subGroupsLength = currentGroupEntry.subGroups.length;
    if(subGroupsLength === 0) { return false }
    else if(subGroupsLength > 0) { return true }
  }

  private getTestCoverageOfAllProjects(currentGroupEntry: GroupEntity): number | null {
    let sumOfTestCoverageOfAllProjects = 0;
    let finalResult = 0;

    const isThereSubGroups = this.groupStats.isThereSubgroups;

    if(!isThereSubGroups) {
      currentGroupEntry.projects.forEach(project => {
        let currentTestCoverage = project.stats.testCoverage;
        if(currentTestCoverage) { sumOfTestCoverageOfAllProjects += currentTestCoverage }
      });
    }
    else {
      currentGroupEntry.subGroups.forEach(subGroup => {
        subGroup.projects.forEach(project => {
          let currentTestCoverage = project.stats.testCoverage;
          if(currentTestCoverage) { sumOfTestCoverageOfAllProjects += currentTestCoverage }
        });
      });
    }

    if(sumOfTestCoverageOfAllProjects === 0)   { finalResult = null }
    else if (sumOfTestCoverageOfAllProjects > 0)  {
      finalResult = +(sumOfTestCoverageOfAllProjects/currentGroupEntry.projects.length).toFixed(2)
    }

    return finalResult;
  }

  private getNumberOfPipelines(currentGroupEntry: GroupEntity): number {
    const isThereSubGroups = this.groupStats.isThereSubgroups;
    let sumOfPipelinesOfAllProjects = 0;

    if(!isThereSubGroups) {
      currentGroupEntry.projects.forEach(project => {
        sumOfPipelinesOfAllProjects += project.stats.numberOfPipelines;
      });
    }
    else {
      currentGroupEntry.subGroups.forEach(subGroup => {
        subGroup.projects.forEach(project => {
          sumOfPipelinesOfAllProjects += project.stats.numberOfPipelines;
        });
      });
    }

    return sumOfPipelinesOfAllProjects;
  }

  private getNumberOfTestReports(currentGroupEntry: GroupEntity): number {
    let sumOfTestReportsOfAllProjects = 0;
    const isThereSubGroups = this.groupStats.isThereSubgroups;

    if(!isThereSubGroups) {
      currentGroupEntry.projects.forEach(project => {
        sumOfTestReportsOfAllProjects += project.stats.numberOfTestReports
      });
    }
    else {
      currentGroupEntry.subGroups.forEach(subGroup => {
        subGroup.projects.forEach(project => {
          sumOfTestReportsOfAllProjects += project.stats.numberOfTestReports
        });
      });
    }


    return sumOfTestReportsOfAllProjects;
  }

  private getTotalNumberOfProjects(currentGroupEntry: GroupEntity): number {
    let isThereSubGroups = this.groupStats.isThereSubgroups;
    let finalNumberOfProjects = 0;

    if(!isThereSubGroups) { finalNumberOfProjects = currentGroupEntry.projects.length }
    else {
        currentGroupEntry.subGroups.forEach(subgroup => {
          finalNumberOfProjects += subgroup.projects.length
        });
    }

    return finalNumberOfProjects;
  }



}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


