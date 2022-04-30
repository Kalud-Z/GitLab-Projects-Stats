import { Component, OnInit } from '@angular/core';
import { displayPipelineChartBannerTrigger } from '../../../_animations/animations';

@Component({
  selector: 'app-test-coverage-details-card',
  templateUrl: './test-coverage-details-card.component.html',
  styleUrls: ['./test-coverage-details-card.component.scss' , '../_shared/shared-details-cards.scss'],
  animations : [
    displayPipelineChartBannerTrigger,
  ],
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestCoverageDetailsCardComponent {

  // @Input() pipelineObject: Pipeline = null
  showBanner = true;

  // formatTestCoverageFN(testCoverage: number): string {
  //   // return formatTestCoverage(testCoverage);
  // }

} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
