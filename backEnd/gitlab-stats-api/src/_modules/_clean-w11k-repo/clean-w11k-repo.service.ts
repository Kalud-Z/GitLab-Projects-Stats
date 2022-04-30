import { HttpService, Injectable } from '@nestjs/common';
const pLimit = require('p-limit')



export interface Job {
  artifactsSizeInByte: number
}

export interface Project {
  id: number;
  name: string;
  jobsRaw?: any[];
  // jobs?: Job[];
  totalSizeOfArtifactsInByte?: number
}


@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class cleanW11kRepoService {
  jobsDeletedCount:number = 0;
  w11kWebsitesProjectID = 13789262;


  maxNumberOfPagesWhenFetchingJobs = 200;
  // maxNumberOfPagesWhenFetchingJobs = 2;

  limitValue = 8;
  limit = pLimit(this.limitValue);

  accessToken = 'HMN81E2fSPaZK94k5E6E';
  CORS = "https://";
  projectID = '13789262' //W11k websites
  jobId = '1245031882' ; //  number 20 . of w11k website
  showTable = false;

  tempArrayOfJobs = [];

  allGroups: any;
  allProjectsRaw = [];
  allTargetProjects: Project[] = [];



  constructor(private http: HttpService) {}


  test() {
    return { hh : 'erererererererere' }
  }


  async fetchProjects() {
    // this.http.put("https://cleaning-w11k-repo-default-rtdb.europe-west1.firebasedatabase.app/projects.json", this.allTargetProjects).subscribe();
    await this.http.get<any[]>("https://cleaning-w11k-repo-default-rtdb.europe-west1.firebasedatabase.app/projects.json").toPromise()
      .then((data: any) => this.allTargetProjects = data.data)
  }


  async deleteArtifactsOfW11kWebsitesProject() {
    console.log('deleteArtifactsOfW11kWebsitesProject is called')
    let index = this.allTargetProjects.findIndex(project => project.id === this.w11kWebsitesProjectID);

    await this.deleteAllArtifactsOfOneProject(this.allTargetProjects[index], [304605786]);
    console.log('___DONE DELETING___')
  }


  async deleteAllArtifactsOfOneProject(project: Project, pipelineIdsToSkip: number[]) {
    let allPromises = project.jobsRaw.map(job => {
      if((pipelineIdsToSkip.indexOf(job.pipeline.id) === -1) && this.stillHasArtifacts(job)) {
        return this.limit(() => this.deleteArtifactsOfOneJob(project.id, job.id));
      }
    });

    return await Promise.all(allPromises);

    // console.log('this is allPromises : ' , allPromises);
  }

  stillHasArtifacts(job: any) {
      if (job.hasOwnProperty('artifacts_file')) { return true }
      else { return false }
  }

  // jobsRaw[i].pipeline.id === 301647303  || 304605786  //keep this one. delete the rest.
  //it deletes all artifacts of the job. (it returns null | success status 204). And the job stays there.
  private async deleteArtifactsOfOneJob(projectID: number, jobId: number) {



    console.log('now gonna delete job : ' , ++this.jobsDeletedCount)
    await this.http.delete(`${this.CORS}gitlab.com/api/v4/projects/${projectID}/jobs/${jobId}/artifacts?access_token=${this.accessToken}`).toPromise()
      .then((data: any) => {
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        if(data.status === 204) {
          console.log('we just deleted artifacts');
        }
      });
  }




  logFilesSize = 0;

  getLogFilesSize() {
    let index = this.allTargetProjects.findIndex(project => project.id === this.w11kWebsitesProjectID);

    this.allTargetProjects[index].jobsRaw.forEach(job => {
      if(job.artifacts?.length > 0) {
        console.log('this job has artifacts : ' , job.artifacts.length)
        job.artifacts.forEach((file: any) => {
          if(file.filename === 'job.log') {
            this.logFilesSize += file.size;
            console.log('so far : ' , this.logFilesSize);
          }
        });
      }
    });

    console.log('this is size of log files : ' ,  this.bytesToSize(this.logFilesSize))

  }





  private bytesToSize(bytes: number) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 MB';
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°




