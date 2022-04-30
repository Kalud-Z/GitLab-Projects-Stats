import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {GitlabStatsServerConfig} from "../../database-config/gitlab-stats-server-config";
import {GITLABSTATS_CONFIG_TOKEN} from "../../database-config/databseConfigProviders";
import {ProjectRepositoryToken} from './project.providers';
import {ProjectEntity} from './model/project.entity';
import {GroupEntity} from '../../_group-related-modules/group/model/group.entity';
import {DatabaseStateService} from "../../shared/services/database-state.service";


interface projectsToExclude {
  name: string;
  id: number;
}


const excludedProjects : projectsToExclude[] = [
  {
    name: 'Auftragsschreibmaschine',
    id: 23234148,
  },
  {
    name: 'Wix Trusted Shops Addon',
    id: 23983845,
  },
]


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectService {  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

  constructor(@Inject(ProjectRepositoryToken) private readonly projectRepository: Repository<ProjectEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig,
              private databaseStateService : DatabaseStateService
              ) {}


  async saveProjectEntity(returnedRawProject: any , currentGroupEntry: GroupEntity): Promise<void> {
    if(excludedProjects.filter(project => project.id === returnedRawProject.id).length === 0) {
      const projectEntry      = new ProjectEntity();
      projectEntry.gitlabId   = returnedRawProject.id;
      projectEntry.name       = returnedRawProject.name
      projectEntry.urlToRepo  = returnedRawProject.http_url_to_repo
      projectEntry.group      = currentGroupEntry;
      await this.projectRepository.save(projectEntry as ProjectEntity)
    }
  }


  async getAllProjects() {
    let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    return await this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect("project.group", "group")
      .where("group.tempData = :state", { state: tempData })
      .getMany()
  }

  async getAllProjectsWithTheirRelations() {  //@oneToMany side of r.ship , is the one does the request to get the target array ...
    let tempData =  !this.databaseStateService.getIsDataBaseEmpty()

    return await  this.projectRepository.createQueryBuilder('project')
      .leftJoinAndSelect("project.group", "group")
      .where("group.tempData = :state", { state: tempData })

      .leftJoinAndSelect("project.pipelines", "pipeline")
      .orderBy("pipeline.id", "ASC") //ASC | DESC
      .leftJoinAndSelect("pipeline.stats", "pipelineStats")
      .leftJoinAndSelect("pipeline.testReport", "testReport")
      // .leftJoinAndSelect("project.group", "group")

      // .orderBy("pipelineStats.created_at_rawDateFormat", "DESC") //ASC
      .getMany();
  }

  async emptyTable() {
    await this.projectRepository.createQueryBuilder().delete().from(ProjectEntity).execute();
  }

}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


