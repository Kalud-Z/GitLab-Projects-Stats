import { Module } from '@nestjs/common';
import {DatabaseConfigModule} from "./_modules/database-config/databaseConfigModule";
import {DatabaseModule} from "./_modules/database/database.module";
import {GroupModule} from './_modules/_group-related-modules/group/group.module';
import {GroupService} from "./_modules/_group-related-modules/group/group.service";
import {DatabaseStateService} from "./_modules/shared/services/database-state.service";
import {HttpModifierHelpingService} from "./_modules/http-service-modifier/http-modifier-helping.service";
import { CleanW11kRepoModule } from './_modules/_clean-w11k-repo/clean-w11k-repo.module';
const cron = require('cron');
const cronJobs = [];

@Module({
  imports: [
      DatabaseConfigModule,
      DatabaseModule,
      GroupModule,
      CleanW11kRepoModule,
  ],
  controllers: [],
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class AppModule {

  constructor(private groupService: GroupService ,
              private databaseStateService : DatabaseStateService,
              private httpModifierHelpingService : HttpModifierHelpingService) {
    this.setDatabaseState();
    if(!process.env.LOCAL_DEV) { this.configureCronJob() }
    console.time();
  }


  async setDatabaseState() {
     let isTableEmpty = await this.groupService.isTableEmpty();
     this.databaseStateService.setIsDataBaseEmpty(isTableEmpty);
   }

  private configureCronJob() {
    console.log('cron job is called');
    cronJobs.push(
      // cron.job( '0 */2 * * *', // Every x hours
      cron.job( '0 7-19/4 * * 1-5', // Between 7-19H , every two hours , only in work day
      // cron.job( '*/3 * * * *', // Every x minutes
      // cron.job( '*/10 * * * * *', // Every x seconds
        () => {
          console.log('Now running Cron Job');
          this.httpModifierHelpingService.fetchDataNow$.next(true);
        },
        null,
        true
      )
    );
  }

} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

