import { Component, Input } from '@angular/core';
import { Project } from '../../_models/project.model';
import { ViewTypes } from '../view-type-tabs/view-type-tabs.component';


export enum LAST_PIPELINE_STATUS { SUCCESS = 'success' , FAILED = 'failed',
                                  CANCELED = 'canceled' , SKIPPED = 'skipped' , RUNNING = 'running'  }

@Component({
  selector: 'app-last-pipeline-status',
  templateUrl: './last-pipeline-status.component.html',
  styleUrls: ['./last-pipeline-status.component.scss'],
})


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class LastPipelineStatusComponent  {
  @Input() project: Project;
  @Input() inTableListView = false;
  @Input() inDashboardView = false;

  getClass(className) {
    let returnedClass: string;
    let extraClass = '';
    if (this.project.stats.status === 'success')  { returnedClass = className + '-success' }
    if (this.project.stats.status === 'failed')   { returnedClass = className + '-failed' }
    if (this.project.stats.status === 'canceled') { returnedClass = className + '-canceled' }
    if (this.project.stats.status === 'skipped')  { returnedClass = className + '-skipped' }
    if (this.project.stats.status === 'running')  { returnedClass = className + '-running' }
    if (!this.project.stats.status)  { returnedClass = className + '-undefined' }
    if(this.inTableListView) { extraClass = className + '-inTableListView' }

    return returnedClass + ' ' + extraClass;
  }

} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
