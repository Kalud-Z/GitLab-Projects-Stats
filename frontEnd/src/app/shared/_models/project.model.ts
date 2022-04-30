import { Pipeline } from './pipeline.model';
import { pipelineStatus } from '../../projects/_shared/_other/projects-shared-types';


export interface GroupInfo {
  name : string,
  id : number
}

export interface ProjectStats {
  status?: pipelineStatus,
  numberOfPipelines?: number,
  areTestsAvailable?: boolean,
  areTestCoveragesAvailable?: boolean;
  numberOfTestReports?: number,
  averageDurationOfPipelines?: number,
  averageDurationOfPipelines_inMinutes?: number,
  testCoverage?: number | null,
  numberOfSuccessfulPipelines?: number,
  numberOfFailedPipelines?: number,
  numberOfCanceledPipelines?: number,
  numberOfRunningPipelines?: number,
  numberOfSkippedPipelines?: number,
  pipelinesSuccessRatio?: number,

  totalRepoSize?: number,
  artifactsSize?: number,
}


export interface PipelinesOfProject {
  totalPipelines?: Pipeline[],
  totalPipelines_last7Day?: Pipeline[],
  totalPipelines_last30Day?: Pipeline[],
  totalPipelines_last60Day?: Pipeline[],
}


export class Project {
  constructor(
    public name: string,
    public id: number,
    public gitlabId: number,
    public urlToRepo: string,
    public pipelines?: Pipeline[],
    public groupInfo?: GroupInfo,
    public stats?: ProjectStats,
  ) {}
}


