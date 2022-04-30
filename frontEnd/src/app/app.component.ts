import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FetchDataService } from './shared/_services/fetch-data.service';
import { AjaxService } from './shared/_services/ajax.service';
import { SynchUIService } from './shared/_services/synch-ui.service';

import { RouterOutlet } from '@angular/router';
import { firstViewTrigger, mainRouteTransitionAnimations } from './shared/_animations/animations';
import { environment } from '../environments/environment';
import { RoutingService } from "./shared/_services/routing.service";
import { CardsTypeOption, OrderByOption } from "./shared/_interfaces/dropdown-menu-option.interface";
import { ProjectsSharedProperties } from "./projects/_shared/_other/projects-shared-properties";
import { HttpClient } from '@angular/common/http';
import { Group } from './shared/_models/group.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations : [
    firstViewTrigger,
    mainRouteTransitionAnimations,
  ],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class AppComponent implements OnInit , AfterViewInit {
  introDone = false;
  doneFetchingData = false;
  showDateLastFetched = false;
  showPopup = false;
  showFinalStepPopup = false;
  numOfPipelinesToFetch = 10;
  repairingDataNow = false;


  orderByOptions:     OrderByOption[] = ProjectsSharedProperties.orderByOptions;
  cardsTypeOptions:   CardsTypeOption[] = ProjectsSharedProperties.cardsTypeOptions;
  dateLastFetched: Date;

  constructor(public routingService: RoutingService,
              public  fetchDataService : FetchDataService,
              private http: HttpClient,
              private ajaxService : AjaxService,
              private synchUIService : SynchUIService,
              private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    let introDelay: number;
    if (environment.enableIntroDelay) { introDelay = 5000 } else { introDelay = 0 }

    this.fetchDataService.childGroups$.subscribe((groups: Group[]) => {
      if (groups) {
        this.doneFetchingData = true
        // console.log(groups[groups.length - 1].subGroups[1].projects[0].pipelines);
        console.log(groups);
      }

      setTimeout(() => this.introDone = true, introDelay)
    });

    this.fetchDataService.getAllGroupsFromDatabase(); // Firebase or localStorage or NestJS

    this.ajaxService.fetchDataLastUpdatedDate()
      .then((obj: any) => {
      if (obj)  { this.dateLastFetched = obj.date }
      else      { this.dateLastFetched = new Date() }
      this.showDateLastFetched = true;
    });


    // this.ajaxService.checkIfBackendUpAndRunning()
    //   .then(data => {
    //     console.log('test request to the backend:' , data);
    //   });

  } //ngOnInit

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onClickProjects() {
    this.synchUIService.disableFilter();
  }

  onClickGroups() {
    this.synchUIService.disableFilter();
    this.synchUIService.resetFilterByName();
  }

  prepareRoute(outlet: RouterOutlet) {
    // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['mainRouteAnimation']; TODO : didnt work properly. when the animation starts , the content of the inner route disappears immediately !
  }

  onTypeOfChartsDataDropdownClick(currentSelectedOption) {
    if(this.routingService.areWeInListView()) { this.changeList(currentSelectedOption) }
    if(this.routingService.areWeInChartView()) { this.changeChart(currentSelectedOption)}
  }

  onTypeOfCardsDataDropdownClick(currentSelectedOption: CardsTypeOption) {
    this.changeCards(currentSelectedOption);
    this.synchUIService.disableFilter();
  }

  repairDatabase() {
    this.showPopup = false;
    this.showFinalStepPopup = false

    alert('This might take several minutes. You will be notified when the repair is done.')
    if(!this.repairingDataNow) {
      this.repairingDataNow = true;
      this.ajaxService.repairDatabase(this.numOfPipelinesToFetch)
        .then(() => {
          console.log('DONE : fetching data from GitLab API.');
          console.log('Please reload the page.');
          alert('DONE repairing the database. You can reload the page now.')
          this.repairingDataNow = false;
        })
    }
  }


  shouldWeShowPopup() {
    if(!this.repairingDataNow) { this.showPopup = !this.showPopup }
  }

  private changeList(option: OrderByOption) {
    this.synchUIService.chartOrderBy$.next(option);
    this.synchUIService.disableFilter();
  }

  private changeChart(option : OrderByOption) {
    this.synchUIService.chartOrderBy$.next(option);
    this.synchUIService.disableFilter();
  }

  private changeCards(option : OrderByOption) {
    this.synchUIService.changeCards$.next(option);
    this.synchUIService.disableFilter();
  }






  // Temporary Testing GitLab API ########################################################################################################################


  CORS = "https://";
  accessToken = 'LXTLGza92fy8Pu6EQ65L';
  pipelines_results_per_page  =  10;

  projectID = 23983845; // Wix Trusted Shops Addon
  groupID = 0;
  pipelineID = 245299503;


  fetchGroup()  {
    this.http.get<any[]>(`${this.CORS}gitlab.com/api/v4/groups/4752824/subgroups?access_token=${this.accessToken}`).subscribe(data => console.log(data));
  }

  fetchAllPipelinesOfProject() {
    this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${this.projectID}/pipelines?access_token=${this.accessToken}&pagination=keyset&per_page=${this.pipelines_results_per_page}&page=1`)
      .subscribe(data => {
      console.log('fetching pipelines of project : ' , data);
    });
  }

  fetchTestReport()  {
    alert('Doesnt work yet')
    // return this.http.get(`${this.CORS}gitlab.com/api/v4/projects/${this.projectID}/pipelines/${this.pipelineID}/test_report?access_token=${this.accessToken}`)
    //   .subscribe(data => {
    //     console.log(data);
    //   })
  }



} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


