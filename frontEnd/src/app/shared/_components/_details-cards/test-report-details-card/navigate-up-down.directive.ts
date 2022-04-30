import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { TestCase, TestReport, TestSuite } from '../../../_models/test-report.model';
import { SectionType } from './test-report-details-card.component';


@Directive({
  selector: '[appNavigateUpDown]'
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class NavigateUpDownDirective {
  @Output() nextTestSuiteToSelect$  = new EventEmitter<TestSuite>();
  @Output() nextTestCaseToSelect$   = new EventEmitter<TestCase>();
  @Output() closeWindow             = new EventEmitter<boolean>();

  nextTestSuiteToSelect: TestSuite;
  nextTestCaseToSelect: TestCase;
  lastSectionClicked: SectionType;

  @Input() testReport: TestReport;
  @Input() currentlySelectedTestSuite: TestSuite;
  @Input() currentlySelectedTestCase: TestCase;

  constructor(private _elementRef : ElementRef) {}

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: any) {
    // event.preventDefault();

    // console.log('event : ' , event);
    if(event.code === 'Escape')       { this.closeWindow.emit(true) }
    // if(event.code === 'ArrowUp')      { this.selectPreviousElement() }
    // if(event.code === 'ArrowDown')    { this.selectNextElement() }
  }

  // @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
  //   if(event.code === 'Escape') { this.closeProjectInfoWindow.emit(true) }
  // }



  @HostListener('document:click', ['$event']) handleClick(event: any) {
    // console.log('handleClick : ' , event);
    event.path.slice(0, 10).forEach(el => {
      // if(el.className.includes(SectionType.Top)) { this.lastSectionClicked = SectionType.Top }
      // if(el.className.includes(SectionType.Left)) { this.lastSectionClicked = SectionType.Left }
    });
    // console.log('lastClickedSection : ' , this.lastSectionClicked)
  }


  private selectPreviousElement() {
    if(this.lastSectionClicked === SectionType.Top) {
      const currentlySelectedTestCaseIndex = this.currentlySelectedTestSuite.test_cases.indexOf(this.currentlySelectedTestCase);
      if(currentlySelectedTestCaseIndex > 0) {
        this.nextTestCaseToSelect = this.currentlySelectedTestSuite.test_cases[currentlySelectedTestCaseIndex-1]
        this.nextTestCaseToSelect$.emit(this.nextTestCaseToSelect);
      }
    }

    if(this.lastSectionClicked === SectionType.Left) {
      const currentlySelectedTestSuiteIndex = this.testReport.test_suites.indexOf(this.currentlySelectedTestSuite);
      if(currentlySelectedTestSuiteIndex > 0) {
        this.nextTestSuiteToSelect = this.testReport.test_suites[currentlySelectedTestSuiteIndex-1];
        this.nextTestSuiteToSelect$.emit(this.nextTestSuiteToSelect);
      }
    }
  }


  private selectNextElement() {
    // console.log('selectNextElement called')
    // console.log('selectNextElement . lastSectionClicked:' , this.lastSectionClicked);
    if(this.lastSectionClicked === SectionType.Top) {  // TODO : @Mario currentlySelectedTestSuite/Case is undefined !
      // console.log( ' selectNextElement. currentlySelectedTestSuite : ', this.currentlySelectedTestSuite)
      const currentlySelectedTestCaseIndex = this.currentlySelectedTestSuite.test_cases.indexOf(this.currentlySelectedTestCase);
      if(currentlySelectedTestCaseIndex < this.testReport.test_suites.length - 1) {
        this.nextTestCaseToSelect = this.currentlySelectedTestSuite.test_cases[currentlySelectedTestCaseIndex+1]
        this.nextTestCaseToSelect$.emit(this.nextTestCaseToSelect);
      }
    }

    if(this.lastSectionClicked === SectionType.Left) {
      const currentlySelectedTestSuiteIndex = this.testReport.test_suites.indexOf(this.currentlySelectedTestSuite);
      if(currentlySelectedTestSuiteIndex < this.testReport.test_suites.length - 1) {
        this.nextTestSuiteToSelect = this.testReport.test_suites[currentlySelectedTestSuiteIndex+1]
        this.nextTestSuiteToSelect$.emit(this.nextTestSuiteToSelect);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      // console.log('changes : ' , changes);
  }


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
