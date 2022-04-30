import { HttpModule, Module } from '@nestjs/common';
import { cleanW11kRepoController } from './clean-w11k-repo.controller';
import { cleanW11kRepoService } from './clean-w11k-repo.service';
import { HttpServiceModifierModule } from '../http-service-modifier/http-service-modifier.module';


@Module({
  imports : [
    HttpServiceModifierModule,
    HttpModule,
  ],

  controllers: [
    cleanW11kRepoController
  ],

  providers: [
    cleanW11kRepoService
  ],

})
export class CleanW11kRepoModule {}

