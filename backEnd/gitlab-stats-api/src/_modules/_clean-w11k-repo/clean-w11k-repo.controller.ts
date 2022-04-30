import { Controller, Delete, Get, Post } from '@nestjs/common';
import { cleanW11kRepoService } from './clean-w11k-repo.service';



@Controller('cleaning')
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class cleanW11kRepoController {


  constructor(private cleaningService: cleanW11kRepoService)  {}


  @Post('send')
  sendEmail() {

  }


  @Get('test')
  async deleteEverything() {
    return this.cleaningService.test();
  }


  @Get('logFilesSize')
  async gg() {
    await this.fetchProjectsFromFirebase();
    this.cleaningService.getLogFilesSize();
  }





  @Get('fetch')
  async fetchProjectsFromFirebase() {
    console.log('now fetching')
    await this.cleaningService.fetchProjects();
  }


  @Delete('delete')
  async deleteArtifacts() {
    await this.fetchProjectsFromFirebase();
    console.log('___________DONE FETCHING___________')
    await this.cleaningService.deleteArtifactsOfW11kWebsitesProject();
    console.log('___________DONE DELETING___________')
  }





} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
