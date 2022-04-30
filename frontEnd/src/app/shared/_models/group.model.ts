import { Project } from './project.model';


export interface GroupStats {
  isThereSubgroups?: boolean,
  numberOfProjects?: number,
  testCoverageOfAllProjects?: number,

  numberOfPipelines?: number,
  numberOfTestReports?: number
}


export class Group {
  constructor(
    public name: string,
    public id: number,
    public gitlabId: number,
    public projects?: Project[],
    public stats?: GroupStats,
    public subGroups?: Group[] | undefined,
  ) {}
}

