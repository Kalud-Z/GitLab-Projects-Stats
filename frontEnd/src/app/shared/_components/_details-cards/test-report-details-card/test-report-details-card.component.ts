import { Component, OnInit } from '@angular/core';
import { displayPipelineChartBannerTrigger, projectInfoPopupTrigger } from '../../../_animations/animations';
import { SynchUIService } from '../../../_services/synch-ui.service';
import { TestCase, TestReport, TestSuite } from '../../../_models/test-report.model';


enum CollapsibleItemsType { TestSuites = "testSuites",  TestCases = "TestCases" }
export enum SectionType { Top = "top",  Left = "left" , Bottom = "bottom" }


@Component({
  selector: 'app-test-report-details-card',
  templateUrl: './test-report-details-card.component.html',
  styleUrls: ['./test-report-details-card.component.scss' , '../_shared/shared-details-cards.scss'],
  animations : [
    displayPipelineChartBannerTrigger,
    projectInfoPopupTrigger
  ],
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class TestReportDetailsCardComponent implements OnInit{
  showTestReportDetails = false;
  testSuiteSelected: TestSuite;

  collapsibleItemsType = CollapsibleItemsType;
  sectionType = SectionType;
  
  collapseTestSuites = false;
  collapseTestCases = false;

  testReport: TestReport;
  testCaseSelected: TestCase;
  lastClickedSection: SectionType;

  constructor(private syncUIService: SynchUIService) {
  }

  ngOnInit(): void {
    this.syncUIService.detailsView.clickedTestReport$.subscribe(testReport => {
      this.testReport = testReport;
      this.showTestReportDetails = true;
    });
  }


  toggleItems(type: CollapsibleItemsType) {
    if(type === CollapsibleItemsType.TestSuites) { this.collapseTestSuites = !this.collapseTestSuites }
    if(type === CollapsibleItemsType.TestCases)  { this.collapseTestCases = !this.collapseTestCases }
  }


  // setTestSuite(testSuite: TestSuite) {
  //   console.log('testuite emitted : ' , testSuite)
  // }
  //
  // setTestCase(testCase: TestCase) {
  //   console.log('testCase emitted : ' , testCase)
  // }
  //
  //

  closePopupWindow(event: boolean) {
    this.showTestReportDetails = !event;
    this.testCaseSelected  = null;
    this.testSuiteSelected = null;
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
