import { Component, Input, OnInit } from '@angular/core';
import { Pipeline } from '../../../_models/pipeline.model';
import { displayPipelineChartBannerTrigger } from '../../../_animations/animations';
import { formatTestCoverage } from '../../../_other/global-shared-methods';
import { SynchUIService } from '../../../_services/synch-ui.service';

@Component({
  selector: 'app-pipeline-details-card',
  templateUrl: './pipeline-details-card.component.html',
  styleUrls: ['./pipeline-details-card.component.scss' , '../_shared/shared-details-cards.scss'],
  animations : [
    displayPipelineChartBannerTrigger,
  ],
})

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class PipelineDetailsCardComponent implements OnInit{
  pipelineObject: Pipeline = null
  showBanner = true;

  formatTestCoverageFN(testCoverage: number): string {
    return formatTestCoverage(testCoverage);
  }

  constructor(private  syncUIService: SynchUIService) {
  }

  ngOnInit(): void {
    this.syncUIService.detailsView.clickedPipeline$.subscribe(pipeline => {
      this.pipelineObject = pipeline;
    });
  }

}  // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
