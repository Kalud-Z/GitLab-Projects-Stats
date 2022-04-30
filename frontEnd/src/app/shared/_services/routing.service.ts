import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Project } from '../_models/project.model';
import { BehaviorSubject } from 'rxjs';
import { SynchUIService } from './synch-ui.service';
import { filter } from 'rxjs/operators';
import { GroupsDataService } from '../../groups/_shared/_services/groups-data.service';

const INITIAL_URL = 'initial_url'

@Injectable({
  providedIn: 'root',
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class RoutingService { // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  previousUrl: string = INITIAL_URL;
  currentUrl: string = INITIAL_URL;

  previousURL$ = new BehaviorSubject<string>(INITIAL_URL);
  private navigatingGroups = false;


  constructor(private router: Router,
              private synchUIService : SynchUIService,
              private groupsDataService: GroupsDataService) {
    this.keepTrackOfRoutes();
    router.events.subscribe(() => this.synchUIService.routeHasChanged$.next(false));
  }


  showProjectDetails(id: number) {
    if(this.areWeInGroupsView()) {
      this.router.navigate(['/groups/details/' + id]);
    }
    else {
      this.router.navigate(['/projects/details/' + id]);
    }
  }

  goToPreviousURL() {
    if(this.previousUrl !== INITIAL_URL) { this.router.navigate(['' + this.previousUrl]) }
    else { this.router.navigate(["../.."]) }
  }

  getCurrentURL(): string {
    if(this.currentUrl === INITIAL_URL) { return this.router.url }
    else { return this.currentUrl }
  }

  getPreviousURL(): string {
    return this.previousUrl;
  }

  goToRepo(project: Project) {
    setTimeout(() => window.open(project.urlToRepo), 150)
  }

  goToGroupsListView(groupID?: number) {
    let targetGroupID: number;
    if(!groupID) { targetGroupID = this.groupsDataService.selectedGroup$.getValue().id }
    else { targetGroupID = groupID }

    this.navigatingGroups = true;
    this.router.navigate(['/groups/list/' + targetGroupID]);
  }

  goToGroupsChartView(groupID?: number) {
    let targetGroupID: number;
    if(!groupID) { targetGroupID = this.groupsDataService.selectedGroup$.getValue().id }
    else { targetGroupID = groupID }

    this.navigatingGroups = true;
    this.router.navigate(['/groups/charts/' + targetGroupID]);
  }

  goToGroupsCardView(groupID?: number) {
    let targetGroupID: number;
    if(!groupID) { targetGroupID = this.groupsDataService.selectedGroup$.getValue().id }
    else { targetGroupID = groupID }

    this.navigatingGroups = true;
    this.router.navigate(['/groups/cards/' + targetGroupID]);
  }

  areInProjectsView() {
    return this.getCurrentURL().includes('projects')
  }

  areWeInGroupsView(): boolean {
   return this.getCurrentURL().includes('groups')
  }

  wereWeInGroupsView(): boolean {
    return this.getPreviousURL().includes('groups')
  }

  areWeInListView(): boolean {
    const currentURL = this.getCurrentURL();
    return currentURL.includes('list')
  }

  areWeInChartView(): boolean {
    const currentURL = this.getCurrentURL();
    return currentURL.includes('chart')
  }

  areWeInCardView(): boolean {
    const currentURL = this.getCurrentURL();
    return currentURL.includes('cards')
  }

  areWeInDetailsView(): boolean {
    const currentURL = this.getCurrentURL();
    return currentURL.includes('details');
  }

  areWeInOverview(): boolean {
    const currentURL = this.getCurrentURL();
    return currentURL.includes('overview');
  }

  private keepTrackOfRoutes() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.urlAfterRedirects;
      this.previousURL$.next(this.previousUrl);
      // this.adjustUIBasedOnCurrentURL(); TODO : you removed this. notice if you broke the design synch ...
    });
  }

  areWeInDashboardView() {
    const currentURL = this.getCurrentURL();
    return currentURL.includes('dashboard')
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
