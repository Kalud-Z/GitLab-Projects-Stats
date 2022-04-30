import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {GITLABSTATS_CONFIG_TOKEN} from '../../database-config/databseConfigProviders';
import {GitlabStatsServerConfig} from '../../database-config/gitlab-stats-server-config';
import {PipelineEntity} from '../pipeline/model/pipeline.entity';
import {PipelineStatsRepositoryToken} from './pipeline-stats.providers';
import {PipelineStatsEntity} from './model/pipeline-stats.entity';
import {pipe} from 'rxjs';


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelineStatsService {

  constructor(@Inject(PipelineStatsRepositoryToken) private readonly pipelineStatsRepository: Repository<PipelineStatsEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig) {}


  async savePipelineStatsEntity(returnedRawPipelineStats: any , currentPipelineEntry: PipelineEntity): Promise<void> {
    const pipelineStats                     =   new PipelineStatsEntity();
    pipelineStats.isTestReportAvailable     =   this.isTestReportAvailable(currentPipelineEntry);;
    pipelineStats.duration                  =   returnedRawPipelineStats.duration;
    pipelineStats.duration_inMinutes        =   this.convertSecondsToMinutes(returnedRawPipelineStats.duration);
    pipelineStats.created_at                =   this.formatDate(returnedRawPipelineStats.created_at)[1] ;
    pipelineStats.created_at_rawDateFormat  =   this.formatDate(returnedRawPipelineStats.created_at)[0]
    pipelineStats.testCoverage              =   this.determineTestCoverage(returnedRawPipelineStats.coverage) ;
    pipelineStats.pipeline                  =   currentPipelineEntry;

    await this.pipelineStatsRepository.save(pipelineStats as PipelineStatsEntity)
  }


  async emptyTable() {
    await this.pipelineStatsRepository.createQueryBuilder().delete().from(PipelineStatsEntity).execute();
  }

  private isTestReportAvailable(pipeline: PipelineEntity) {

    // console.log('pipeline  ' ,  pipeline);
    // console.log('pipeline.testReport  ' ,  pipeline.testReport  );



    //
    // if(pipeline.testReport.total_count === 0) {
    //   return false;
    // }
    // else if(pipeline.testReport.total_count > 0) {
    //   return true;
    // }

    if(!pipeline.testReport) {
      return false;
    }
    else { return true }
  }

  private convertSecondsToMinutes(durationInSeconds : number): number {
    let final = durationInSeconds / 60;
    return +final.toFixed(2);
  }

  private formatDate(dataCreated_at: string): [Date , string] {
    let dateString = dataCreated_at.slice(0 , 10);
    let dateArrayOfStrings = dateString.split('-');

    let finalDate = new Date();
    finalDate.setFullYear(+dateArrayOfStrings[0] , +dateArrayOfStrings[1]-1 , +dateArrayOfStrings[2] )

    let newArrayOfStrings = finalDate.toDateString().split(' ');
    let year = newArrayOfStrings[3].slice(2, 4);
    let month = newArrayOfStrings[1];
    let day = newArrayOfStrings[2];

    let finalDataString = month + '-' + day + '-' + year;

    return [ finalDate , finalDataString ]
  }

  private determineTestCoverage(coverage: null | string): null | number {
    if(coverage == null) { return null }
    else { return +coverage }
  }



}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



