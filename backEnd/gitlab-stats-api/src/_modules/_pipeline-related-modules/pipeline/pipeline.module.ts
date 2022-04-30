import {forwardRef, Module} from '@nestjs/common';
import {PipelineService} from './pipeline.service';
import {PipelineProviders} from './pipeline.providers';
import {SharedModule} from "../../shared/shared.module";


@Module({
  imports : [
    forwardRef(() => SharedModule),
  ],

  providers: [
    PipelineService,
    ...PipelineProviders,
  ],
  exports : [
    PipelineService,
    ...PipelineProviders,
  ]


})

export class PipelineModule {}
