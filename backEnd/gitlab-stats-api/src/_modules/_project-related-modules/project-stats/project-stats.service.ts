import { Inject, Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {ProjectStatsRepositoryToken} from './project-stats.providers';
import {ProjectStatsEntity} from './model/project-stats.entity';
import {ProjectEntity} from '../project/model/project.entity';


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectStatsService {
  projectStats: ProjectStatsEntity;


  constructor(@Inject(ProjectStatsRepositoryToken) private readonly projectStatsRepository: Repository<ProjectStatsEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig) {}


  async saveProjectStatsEntity(projectDetailsRaw: any, currentProjectEntry: ProjectEntity): Promise<void> {
    this.projectStats                                       = new ProjectStatsEntity();
    this.projectStats.status                                = this.getProjectStatus(currentProjectEntry);
    this.projectStats.numberOfRunningPipelines              = this.getNumberOfRunningPipelines(currentProjectEntry);
    this.projectStats.numberOfSkippedPipelines              = this.getNumberOfSkippedPipelines(currentProjectEntry);
    this.projectStats.numberOfSuccessfulPipelines           = this.getNumberOfSuccessfulPipelines(currentProjectEntry);
    this.projectStats.numberOfFailedPipelines               = this.getNumberOfFailedPipelines(currentProjectEntry);
    this.projectStats.numberOfCanceledPipelines             = this.getNumberOfCanceledPipelines(currentProjectEntry);
    this.projectStats.numberOfPipelines                     = this.getNumberOfPipelines(currentProjectEntry);
    this.projectStats.numberOfTestReports                   = this.getNumberOfTestReports(currentProjectEntry);
    this.projectStats.areTestsAvailable                     = this.areTestAvailableInProject();
    this.projectStats.averageDurationOfPipelines            = this.getAverageDurationOfPipelines(currentProjectEntry);
    this.projectStats.averageDurationOfPipelines_inMinutes  = this.convertSecondsToMinutes(this.getAverageDurationOfPipelines(currentProjectEntry));
    this.projectStats.pipelinesSuccessRatio                 = this.getPipelinesSuccessRatio();
    this.projectStats.testCoverage                          = this.getTestCoverage(currentProjectEntry);
    this.projectStats.areTestCoveragesAvailable             = this.areTestCoveragesAvailable(currentProjectEntry);

    this.projectStats.totalRepoSize                         = projectDetailsRaw.statistics?.repository_size;
    this.projectStats.artifactsSize                         = projectDetailsRaw.statistics?.job_artifacts_size;

    // console.log('this is projectDetailsRaw.statistics.repository_size : ' , projectDetailsRaw.statistics.repository_size);

    // await this.getRepoAndArtifactsSize(currentProjectEntry)  //TODO : write it the way you wrote savePipelineStatsEntity() and its caller ..
    //   .then((data: any) => {
    //     [this.projectStats.totalRepoSize, this.projectStats.artifactsSize] = [data.statistics.repository_size, data.statistics.job_artifacts_size];
    //   });
    //
    // console.log('after getRepoAndArtifactsSize');
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

    this.projectStats.project = currentProjectEntry;
    await this.projectStatsRepository.save(this.projectStats as ProjectStatsEntity);
  }

  // private async getRepoAndArtifactsSize(project: ProjectEntity) {
  //   console.log('inside getRepoAndArtifactsSize');
  //   return await fetchProjectRepoAndArtifactsSize(project.gitlabId);
  //     // .then((data: any) => {
  //     //   temp = [data.statistics.repository_size, data.statistics.job_artifacts_size]
  //     // });
  //
  //   function fetchProjectRepoAndArtifactsSize(projectID: number) {
  //     let CORS = "https://";
  //     let accessToken = 'LXTLGza92fy8Pu6EQ65L';
  //
  //     return this.http.get(`${CORS}gitlab.com/api/v4/projects/${projectID}?statistics=true&access_token=${accessToken}`).toPromise();
  //
  //     //     returned data :
  //     //
  //     // // data.statistics.job_artifacts_size
  //     // // data.statistics.repository_size
  //   }
  //
  //
  // }

  //returns all projects . without their pipelines.
  async getAllProjectStatsEntries() {
    return await this.projectStatsRepository.createQueryBuilder('projectStats').getMany()
  }

  async emptyTable() {
    await this.projectStatsRepository.createQueryBuilder().delete().from(ProjectStatsEntity).execute();
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++  HELPING FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //test coverage of the latest pipeline
  private getTestCoverage(project : ProjectEntity): number | null {
    if(project.pipelines?.length > 0) {
      return project.pipelines[0].stats.testCoverage;
    } else if(!project.pipelines) { return null }
  }

  private getNumberOfRunningPipelines(project: ProjectEntity): number {
    let finalResult = 0;
    project.pipelines?.forEach(pipeline => {
      if(pipeline.status == 'running') { finalResult++ }
    });
    return finalResult;
  }

  private getNumberOfSkippedPipelines(project: ProjectEntity): number {
    let finalResult = 0;
    project.pipelines?.forEach(pipeline => { if(pipeline.status == 'skipped') { finalResult++ } });
    return finalResult;
  }

  private getNumberOfSuccessfulPipelines(project: ProjectEntity): number {
    let finalResult = 0;
    project.pipelines?.forEach(pipeline => { if(pipeline.status == 'success') { finalResult++ } });
    return finalResult;
  }

  private getNumberOfFailedPipelines(project: ProjectEntity): number {
    let finalResult = 0;
    project.pipelines?.forEach(pipeline => { if(pipeline.status == 'failed') { finalResult++ } });
    return finalResult;
  }

  private getNumberOfCanceledPipelines(project: ProjectEntity): number {
    let finalResult = 0;
    project.pipelines?.forEach(pipeline => { if(pipeline.status == 'canceled') { finalResult++ } });
    return finalResult;
  }

  private getNumberOfPipelines(project: ProjectEntity): number {
    if(project.pipelines) { return project.pipelines.length; } else { return 0 }
  }

  private getNumberOfTestReports(project: ProjectEntity): number {
    if(this.projectStats.numberOfPipelines == 0) { return 0 }
    let counter = 0;
    project.pipelines?.forEach(pipeline => {
      if(pipeline.stats.isTestReportAvailable) { counter++ }
    });
    return counter;
  }

  private areTestAvailableInProject(): boolean {
    if(this.projectStats.numberOfTestReports == 0)  { return false } else { return true  }
  }

  private getAverageDurationOfPipelines(project: ProjectEntity): number {
    let sumAllDuration = 0;
    let result = 0;

    project.pipelines?.forEach(pipeline =>  sumAllDuration += pipeline.stats.duration);
    if(sumAllDuration === 0) { result = 0 }
    else { result = +(sumAllDuration/this.projectStats.numberOfPipelines).toFixed(0) }
    return  result;
  }

  private getPipelinesSuccessRatio(): number | null {
    if(this.projectStats.numberOfPipelines === 0) { return null }
    else if(this.projectStats.numberOfPipelines > 0) {
      let result = (this.projectStats.numberOfSuccessfulPipelines * 100) / this.projectStats.numberOfPipelines;
      let finalResult = result.toFixed(2);
      return  +finalResult;
    }
  }

  private convertSecondsToMinutes(durationInSeconds : number): number {
    let final = durationInSeconds / 60;
    return +final.toFixed(2);
  }


  private getProjectStatus(currentProjectEntry: ProjectEntity): string {
    return currentProjectEntry.pipelines[0]?.status;
  }


  private areTestCoveragesAvailable(currentProjectEntry: ProjectEntity): boolean {
    let result: boolean = false;
    currentProjectEntry.pipelines.forEach(pipeline => {
      if(pipeline.stats.testCoverage !== null) { result = true }
    });

    return result;
  }

  async deleteOutdatedEntries() {
      // // await this.groupStatsRepository.createQueryBuilder('groupStats')
      // await this.projectStatsRepository.createQueryBuilder()
      //   // .leftJoinAndSelect("groupStats.group", "group")
      //   // .where("group.tempData = :state", { state: false })
      //   // .delete()
      //   // .execute();
      //
      //   .delete()
      //   .from(GroupStatsEntity)
      //   .where("group.tempData = :state", { state: false  })
      //   .execute();


      // .createQueryBuilder()
      //     .delete()
      //     .from(User)
      //     .where("id = :id", { id: 1 })
      //     .execute();

  }

}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°










