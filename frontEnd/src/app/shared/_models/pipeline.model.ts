import { TestReport } from './test-report.model';
import { pipelineStatus } from '../../projects/_shared/_other/projects-shared-types';

export interface PipelineStats {
  isTestReportAvailable?: boolean,
  duration?: number,
  duration_inMinutes?: number,
  created_at?: string,
  created_at_rawDateFormat?: Date
  testCoverage?: number | null
}


export class Pipeline {
  constructor(
    public id: number,
    public gitlabId: number,
    public status: pipelineStatus,
    public testReport?: TestReport,
    public stats?: PipelineStats,
  ) {}
}

