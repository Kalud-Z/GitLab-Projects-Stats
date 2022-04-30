import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../../_services/routing.service';
import { TableColumnsNames } from '../../_data-view-types/display-projects-list-view/display-projects-list-view.component';
import { SynchUIService } from '../../../_services/synch-ui.service';

@Component({
  selector: 'app-table-columns-dropdown',
  templateUrl: './table-columns-dropdown.component.html',
  styleUrls: ['./table-columns-dropdown.component.scss'],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TableColumnsDropdownComponent implements OnInit {  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  TableColumnsNames = TableColumnsNames;
  tableColumnsNamesArray : string[];
  currentlySelectedColumns: TableColumnsNames[] = [
    // TableColumnsNames.PIPELINES_AVG_DURATION,
    TableColumnsNames.TOTAL_PIPELINES,
    TableColumnsNames.PROJECT_NAME,
    // TableColumnsNames.LAST_PIPELINE_DATE,
    TableColumnsNames.LAST_PIPELINE_STATUS,
    TableColumnsNames.TEST_COVERAGE,
    TableColumnsNames.LAST_PIPELINE_DATE,
  ]


  constructor(private routingService: RoutingService, private synchUIService: SynchUIService ) { }

  ngOnInit(): void {
    this.tableColumnsNamesArray =  Object.values(TableColumnsNames);
    this.synchUIService.currentlySelectedColumns$.next([this.currentlySelectedColumns]);
  }


  shouldWeHideThisComponent() {
    return this.routingService.areWeInListView()
  }



  toggleColumn(column: string) {
    const isProjectNameClicked = (column as TableColumnsNames) === TableColumnsNames.PROJECT_NAME
    const isTotalPipelinesClicked = (column as TableColumnsNames) === TableColumnsNames.TOTAL_PIPELINES
    if(!isProjectNameClicked && !isTotalPipelinesClicked)
    {
      const targetIndex = this.currentlySelectedColumns.indexOf(column as TableColumnsNames);

      if(targetIndex === -1) { this.currentlySelectedColumns.push(column as TableColumnsNames) }
      else { this.currentlySelectedColumns.splice(targetIndex , 1) }

      this.synchUIService.currentlySelectedColumns$.next([this.currentlySelectedColumns , column as TableColumnsNames]);
    }
  }


  isOptionSelected(column: string): boolean{
    const targetIndex = this.currentlySelectedColumns.indexOf(column as TableColumnsNames);
    return targetIndex !== -1;
  }


}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°




