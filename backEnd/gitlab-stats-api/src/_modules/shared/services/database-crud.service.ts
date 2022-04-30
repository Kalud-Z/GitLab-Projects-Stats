import {Inject, Injectable} from '@nestjs/common';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {ProjectService} from '../../_project-related-modules/project/project.service';
import {GroupService} from '../../_group-related-modules/group/group.service';
import {PipelineService} from '../../_pipeline-related-modules/pipeline/pipeline.service';
import {TestReportService} from '../../_pipeline-related-modules/test-report/test-report.service';
import {PipelineStatsService} from '../../_pipeline-related-modules/pipeline-stats/pipeline-stats.service';
import {GroupInfoService} from '../../_group-related-modules/group-info/group-info.service';
import {ProjectStatsService} from '../../_project-related-modules/project-stats/project-stats.service';
import {GroupStatsService} from '../../_group-related-modules/group-stats/group-stats.service';

@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class DatabaseCrudService {


  constructor(
    @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig,
    private projectService: ProjectService,
    private projectStatsService: ProjectStatsService,
    private groupService: GroupService,
    private groupStatsService: GroupStatsService,
    private pipelineService: PipelineService,
    private testReportService: TestReportService,
    private pipelineStatsService: PipelineStatsService,
    private groupInfoService: GroupInfoService
  ){}


  async deleteEverything(): Promise<void> {
    console.log('now deleting everything ...');
    // await this.groupStatsService.emptyTable();
    // await this.projectStatsService.emptyTable();
    // await this.groupInfoService.emptyTable();
    // await this.pipelineStatsService.emptyTable();
    // await this.testReportService.emptyTable();
    // await this.pipelineService.emptyTable();
    // await this.projectService.emptyTable();
    await this.groupService.emptyTable();
    console.log('DONE : deleting everything.');
  }


  async deleteOutdatedEntries() {
    console.log('now deleting outdated data ...');
    await this.groupService.removeOutdatedData();
    console.log('DONE deleting the outdated data..');
  }


  async updateDataFlag() {
    console.log('now updating groups flag.')
    await this.groupService.updateFlag();
    console.log('DONE updating group flag');
  }


  async deleteErroredData() {
    console.log('now removing errored data')
    await this.groupService.removeErroredData();
    console.log('DONE : removing errored data')
  }



} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
