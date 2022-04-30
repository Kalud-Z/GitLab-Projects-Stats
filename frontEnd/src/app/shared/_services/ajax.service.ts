import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Group } from '../_models/group.model';
import { GROUPS } from './saved-groups';


@Injectable({
  providedIn: 'root',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class AjaxService {

  CORS = "https://cors-anywhere.herokuapp.com/"
  // CORS = "https://";


  constructor(private http: HttpClient) {}


  fetchGroupsFromFirebase() {
    // return this.http.get<Group[]>("https://gitlab-stats-111.firebaseio.com/groups.json")
    return this.http.get<Group[]>("https://gitlab-stats-111.firebaseio.com/groupsTemp.json")
  }


  // ###############################################################   nestJS    #################################################################


  async fetchGroupsFromNestJS(): Promise<any> {
    // return await this.http.get(environment.fetchDataEndPoint).toPromise();
    return GROUPS;
  }


  async repairDatabase(numOfPipelines: number): Promise<any> {
    console.log('now deleting database content ...')
    await this.http.delete(environment.fetchDataEndPoint).toPromise().finally(()=> { console.log('DONE : deleting ')})
    console.log('fetching data from GitLab API ...')
    return await this.http.post(environment.fetchDataEndPoint , {numberOfPipelines : numOfPipelines}).toPromise();
  }


   async fetchDataLastUpdatedDate() {
    // return await this.http.get(environment.fetchDateLastFetchEndPoint).toPromise();
     return new Promise(resolve => new Date());
  }

  async checkIfBackendUpAndRunning() {
    return await this.http.get(environment.checkBackend).toPromise();
  }


} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

