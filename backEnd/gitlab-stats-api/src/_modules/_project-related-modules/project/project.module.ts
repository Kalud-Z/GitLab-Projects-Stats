import {forwardRef, Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectProviders} from './project.providers';
import {SharedModule} from "../../shared/shared.module";

@Module({
  imports : [
    forwardRef(() => SharedModule),
  ],
  providers: [
    ProjectService,
    ...ProjectProviders,
  ],
  exports : [
    ProjectService,
    ...ProjectProviders,
  ]


})
export class ProjectModule {}
