import {forwardRef, Module} from '@nestjs/common';
import {DatabaseCrudService} from './services/database-crud.service';
import {GroupModule} from '../_group-related-modules/group/group.module';
import {ProjectModule} from '../_project-related-modules/project/project.module';
import {PipelineModule} from '../_pipeline-related-modules/pipeline/pipeline.module';
import {DatabaseStateService} from "./services/database-state.service";

@Module({
  imports : [
    forwardRef(() => GroupModule),
    forwardRef(() => ProjectModule),
    forwardRef(() => PipelineModule),
  ],
  providers: [
    DatabaseCrudService,
    DatabaseStateService
  ],

  exports : [
    DatabaseCrudService,
    DatabaseStateService
  ]

})
export class SharedModule {}
