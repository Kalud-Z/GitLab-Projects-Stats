import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {GitlabStatsServerConfig} from "../../database-config/gitlab-stats-server-config";
import {GITLABSTATS_CONFIG_TOKEN} from "../../database-config/databseConfigProviders";
import {PipelineEntity} from './model/pipeline.entity';
import {PipelineRepositoryToken} from './pipeline.providers';
import {ProjectEntity} from '../../_project-related-modules/project/model/project.entity';
import {DatabaseStateService} from "../../shared/services/database-state.service";


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelineService {

  constructor(@Inject(PipelineRepositoryToken) private readonly pipelineRepository: Repository<PipelineEntity>,
              @Inject(GITLABSTATS_CONFIG_TOKEN) private config: GitlabStatsServerConfig,
              private databaseStateService: DatabaseStateService
              ) {}


  async savePipelineEntity(returnedRawPipeline: any , currentProjectEntry: ProjectEntity): Promise<void> {
    const pipelineEntry     = new PipelineEntity();
    pipelineEntry.gitlabId  = returnedRawPipeline.id;
    pipelineEntry.status    = returnedRawPipeline.status;
    pipelineEntry.project   = currentProjectEntry;

    await this.pipelineRepository.save(pipelineEntry as PipelineEntity)
  }



  async getAllPipelinesWithTheirRelations(): Promise<PipelineEntity[]> {  //@oneToMany side of r.ship , is the one does the request to get the target array ...
    let tempData =  !this.databaseStateService.getIsDataBaseEmpty()
    return await  this.pipelineRepository.createQueryBuilder('pipeline')
      .leftJoinAndSelect("pipeline.project", "project")
      .leftJoinAndSelect("project.group", "group")
      .where("group.tempData = :state", { state: tempData })
      .leftJoinAndSelect("pipeline.testReport", "testReport")
      .getMany();
  }

  async emptyTable() {
    await this.pipelineRepository.createQueryBuilder().delete().from(PipelineEntity).execute();
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



