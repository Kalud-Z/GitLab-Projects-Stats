import {HttpService, Injectable} from '@nestjs/common';

const areWeInDevMode = process.env.LOCAL_DEV

@Injectable()
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class AjaxService {
  projects_results_per_page   =  100;
  groups_results_per_page     =  100;
  pipelines_results_per_page  =  97;

  accessToken = 'glpat-BPkdijAqGpA2F3y3JsR_'; ////TODO : make sure the access token is still valid. check README for further instructions.

  // CORS = "https://cors-anywhere.herokuapp.com/"
  CORS = "https://";

  constructor(private http: HttpService) {}

  setPipelinesResultsPerPage(num : number) {
    this.pipelines_results_per_page = num;
  }

  fetchTestReport(projectID: number , pipelineID: number): Promise<any>  {
    return this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${projectID}/pipelines/${pipelineID}/test_report?access_token=${this.accessToken}`).toPromise();
  }


  fetchAllProjectsWithinGroup(targetGroupID : number): Promise<any> {
    return this.http.get<any[]>(`${this.CORS}gitlab.com/api/v4/groups/${targetGroupID}/projects?access_token=${this.accessToken}&pagination=keyset&per_page=${this.projects_results_per_page}&page=1`).toPromise();
  }



  fetchAllSubgroups(targetGroupID : number): Promise<any> {
    return this.http.get<any[]>(`${this.CORS}gitlab.com/api/v4/groups/${targetGroupID}/subgroups?access_token=${this.accessToken}&pagination=keyset&per_page=${this.groups_results_per_page}&page=1`).toPromise();
  }


  fetchAllPipelinesOfProject(projectID : number): Promise<any> {
    return this.http.get<any[]>(`${this.CORS}gitlab.com/api/v4/projects/${projectID}/pipelines?access_token=${this.accessToken}&pagination=keyset&per_page=${this.pipelines_results_per_page}&page=1`).toPromise();
  }



  fetchDetailsOfPipeline(projectID : number , pipelineID: number): Promise<any> {
    return this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${projectID}/pipelines/${pipelineID}?access_token=${this.accessToken}`).toPromise();
  }


  fetchJobsOfPipeline(projectID : number, pipelineID: number) {
    return this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${projectID}/pipelines/${pipelineID}/jobs?access_token=${this.accessToken}`);
  }


  fetchJobsOfProject(projectID : number) {
    return this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${projectID}/jobs?access_token=${this.accessToken}`);
  }


  fetchProjectRepoAndArtifactsSize(projectID: number) {
    return this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${projectID}?statistics=true&access_token=${this.accessToken}`).toPromise();
  }



  dateLastUpdated = {
    fileName : areWeInDevMode ? 'dataLastUpdated-dev.json' : 'dataLastUpdated.json',
    set: (date : Date) => {
      this.http.put(`https://gitlab-stats-111.firebaseio.com/${this.dateLastUpdated.fileName}`, date)
      .subscribe(data => { console.log('we just saved date last updated in the database') });
    },

    fetch: () => {
      return this.http.get(`https://gitlab-stats-111.firebaseio.com/${this.dateLastUpdated.fileName}`).toPromise();
    }
  }


  //
  // dataLastUpdatedFileName:string = areWeInDevMode ? 'dataLastUpdated-dev.json' : 'dataLastUpdated.json'
  //
  // setDateLastUpdated(date : Date) {
  //   this.http.put(`https://gitlab-stats-111.firebaseio.com/${this.dataLastUpdatedFileName}`, date)
  //     .subscribe(data => { console.log('we just saved date last updated in the database') });
  // }
  //
  //
  // getDateLastUpdated() {
  //   return this.http.get(`https://gitlab-stats-111.firebaseio.com/${this.dataLastUpdatedFileName}`).toPromise();
  // }




}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

