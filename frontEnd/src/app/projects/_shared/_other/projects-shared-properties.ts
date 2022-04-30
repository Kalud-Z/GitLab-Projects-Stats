import { CardsTypeOption, OrderByOption } from "../../../shared/_interfaces/dropdown-menu-option.interface";


export enum orderByOptionsIDs { AvgDuration = 'avgDuration' , Pipelines = 'pipelines' , TestReports = 'testReports' }
export enum cardsTypeOptionsIDs { TestCoverage = 'TestCoverage' , Pipelines = 'pipelines' , TestReports = 'testReports' }
export enum ChartsTypes { TestCoverage = 'TestCoverage' , Pipelines = 'pipelines' , TestReports = 'testReports' }

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class ProjectsSharedProperties {

  static orderByOptions: OrderByOption[] = [
    { id : orderByOptionsIDs.AvgDuration , description : 'Avg Duration Of Pipelines (minutes)'},
    { id : orderByOptionsIDs.Pipelines , description : 'Number of Pipelines'},
    { id : orderByOptionsIDs.TestReports , description : 'Number of Test Reports'},
  ]

  static cardsTypeOptions: CardsTypeOption[] = [
    { id : cardsTypeOptionsIDs.TestCoverage , description : 'Test Coverages'},
    { id : cardsTypeOptionsIDs.Pipelines , description : 'Pipelines'},
    { id : cardsTypeOptionsIDs.TestReports , description : 'Test Reports'},
  ]


} // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

