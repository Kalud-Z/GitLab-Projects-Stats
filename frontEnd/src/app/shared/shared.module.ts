import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { ViewTypeTabsComponent } from './_components/view-type-tabs/view-type-tabs.component';
import { LoadingSpinnerComponent } from './_components/loading-spinner/loading-spinner.component';
import { FilterDropdownComponent } from './_components/_dropdown-menus/filter-dropdown/filter-dropdown.component';
import { TypeOfChartDataDropdownComponent } from './_components/_dropdown-menus/type-of-chart-data-dropdown/type-of-chart-data-dropdown.component';
import { UnderConstructionComponent } from './_components/under-construction/under-construction.component';
import { PipelinesPieChartComponent } from './_components/_charts/pipelines-pie-chart/pipelines-pie-chart.component';
import { ShortenTextPipe } from './_pipes/shorten-text.pipe';
import { SearchBarComponent } from './_components/search-bar/search-bar.component';
import { SearchProjectPipe } from './_pipes/search-project.pipe'

import { ProgressBarModule } from 'angular-progress-bar';
// import { TooltipModule } from 'ng2-tooltip-directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'chartjs-plugin-datalabels';
import { ChartsModule } from 'ng2-charts';

import { Chart } from 'chart.js';
import { LastPipelineStatusComponent } from './_components/last-pipeline-status/last-pipeline-status.component';
import { FormatDaysAgoPipe } from './_pipes/format-days-ago.pipe';
import { DisplayProjectsListViewComponent } from './_components/_data-view-types/display-projects-list-view/display-projects-list-view.component';
import { ProjectInfoComponent } from './_components/project-info/project-info.component';
import { TableColumnsDropdownComponent } from './_components/_dropdown-menus/table-columns-dropdown/table-columns-dropdown.component';
import { FilterProjectsByNameOrIDPipe } from './_components/_data-view-types/display-projects-list-view/_pipes/filter-projects-by-name-or-id.pipe';
import { TestCoverageBannerComponent } from './_components/test-coverage-banner/test-coverage-banner.component';
import { DisplayProjectsChartViewComponent } from './_components/_data-view-types/display-projects-chart-view/display-projects-chart-view.component';
import { DisplayProjectsCardViewComponent } from './_components/_data-view-types/display-projects-card-view/display-projects-card-view.component';
import { GoBackToScrolledPositionDirective } from './_components/_data-view-types/display-projects-card-view/_directives/go-back-to-scrolled-position.directive';

import { SimpleSmoothScrollModule } from 'ng2-simple-smooth-scroll';
import { TestCoverageChartComponent } from './_components/_charts/test-coverage-chart/test-coverage-chart.component';
import { PipelinesChartCardComponent } from './_components/_data-view-types/display-projects-card-view/_cards/pipelines-chart-card/pipelines-chart-card.component';
import { TestCoveragesChartCardComponent } from './_components/_data-view-types/display-projects-card-view/_cards/test-coverages-chart-card/test-coverages-chart-card.component';
import { TypeOfCardsDropdownComponent } from './_components/_dropdown-menus/type-of-cards-dropdown/type-of-cards-dropdown.component';
import { TestReportChartComponent } from './_components/_charts/test-report-chart/test-report-chart.component';
import { TestReportCardComponent } from './_components/_data-view-types/display-projects-card-view/_cards/test-report-card/test-report-card.component';
import { SortProjectsBasedOnXXXPipe } from "./_components/_data-view-types/display-projects-card-view/_pipes/sort-projects-based-on-xxx.pipe";
import { HideEmptyCardsPipe } from './_components/_data-view-types/display-projects-card-view/_pipes/hide-empty-cards.pipe';
import { ShowOnlyEmptyCardsPipe } from './_components/_data-view-types/display-projects-card-view/_pipes/show-only-empty-cards.pipe';
import { HowFarWeGoBackPipe } from './_components/_data-view-types/display-projects-card-view/_pipes/how-far-we-go-back.pipe';
import { ProjectDetailsViewComponent } from './_components/_data-view-types/project-details-view/project-details-view.component';
import { ScrollToPipelineDetailsDirective } from "./_components/_data-view-types/project-details-view/scroll-to-pipeline-details.directive";
import { PipelineDetailsCardComponent } from "./_components/_details-cards/pipeline-details-card/pipeline-details-card.component";
import { HttpClientModule } from "@angular/common/http";
import { HowFarWeGoBackDropdownComponent } from './_components/_dropdown-menus/how-far-we-go-back-dropdown/how-far-we-go-back-dropdown.component';
import { PipelinesBarChartComponent } from './_components/_charts/pipelines-bar-chart/pipelines-bar-chart.component';
import { TestReportDetailsCardComponent } from './_components/_details-cards/test-report-details-card/test-report-details-card.component';
import { TestCoverageDetailsCardComponent } from './_components/_details-cards/test-coverage-details-card/test-coverage-details-card.component';
import { NavigateUpDownDirective } from './_components/_details-cards/test-report-details-card/navigate-up-down.directive';
import { DisplayProjectsDashboardViewComponent } from './_components/_data-view-types/display-projects-dashboard-view/display-projects-dashboard-view.component';
import { SortDashboardDropdownComponent } from './_components/_dropdown-menus/sort-dashboard-dropdown/sort-dashboard-dropdown.component';
import { SortProjectsPipe } from './_components/_data-view-types/display-projects-dashboard-view/sort-projects.pipe';
import { LastPipelineStatusColumnFilterPipe } from './_components/_data-view-types/display-projects-list-view/_pipes/last-pipeline-status-column-filter.pipe';
import { PipelinesColumnFilterPipe } from './_components/_data-view-types/display-projects-list-view/_pipes/pipelines-column-filter.pipe';
import { TestCoverageColumnFilterPipe } from './_components/_data-view-types/display-projects-list-view/_pipes/test-coverage-column-filter.pipe';
import { SortProjectBasedOnColumnPipe } from './_components/_data-view-types/display-projects-list-view/_pipes/sort-project-based-on-column.pipe';
import { ConvertSizeFromBytesToXXXPipe } from './_pipes/convert-size-from-bytes-to-xxx.pipe';

Chart.defaults.global.plugins.datalabels.display = false;



@NgModule({
  declarations: [
    ScrollToPipelineDetailsDirective,
    ProjectInfoComponent,
    ViewTypeTabsComponent,
    LoadingSpinnerComponent,
    FilterDropdownComponent,
    TypeOfChartDataDropdownComponent,
    UnderConstructionComponent,
    PipelinesPieChartComponent,
    ShortenTextPipe,
    SearchBarComponent,
    SearchProjectPipe,
    LastPipelineStatusComponent,
    FormatDaysAgoPipe,
    DisplayProjectsListViewComponent,
    TableColumnsDropdownComponent,
    FilterProjectsByNameOrIDPipe,
    TestCoverageBannerComponent,
    DisplayProjectsChartViewComponent,
    DisplayProjectsCardViewComponent,
    GoBackToScrolledPositionDirective,
    TestCoverageChartComponent,
    PipelinesChartCardComponent,
    TestCoveragesChartCardComponent,
    TypeOfCardsDropdownComponent,
    TestReportChartComponent,
    TestReportCardComponent,
    SortProjectsBasedOnXXXPipe,
    HideEmptyCardsPipe,
    ShowOnlyEmptyCardsPipe,
    HowFarWeGoBackPipe,
    ProjectDetailsViewComponent,
    PipelineDetailsCardComponent,
    HowFarWeGoBackDropdownComponent,
    PipelinesBarChartComponent,
    TestReportDetailsCardComponent,
    TestCoverageDetailsCardComponent,
    NavigateUpDownDirective,
    DisplayProjectsDashboardViewComponent,
    SortDashboardDropdownComponent,
    SortProjectsPipe,
    LastPipelineStatusColumnFilterPipe,
    PipelinesColumnFilterPipe,
    TestCoverageColumnFilterPipe,
    SortProjectBasedOnColumnPipe,
    ConvertSizeFromBytesToXXXPipe,
  ],
    imports: [
        CommonModule,
        RouterModule,
        ChartsModule,
        FormsModule,
        HttpClientModule,
        ProgressBarModule,
        // TooltipModule,
        BrowserAnimationsModule,
        SimpleSmoothScrollModule,
    ],
  exports: [
    ProjectInfoComponent,
    ViewTypeTabsComponent,
    LoadingSpinnerComponent,
    FilterDropdownComponent,
    TypeOfChartDataDropdownComponent,
    UnderConstructionComponent,
    PipelinesPieChartComponent,
    ShortenTextPipe,
    SearchBarComponent,
    SearchProjectPipe,
    LastPipelineStatusComponent,
    FormatDaysAgoPipe,
    DisplayProjectsListViewComponent,
    TableColumnsDropdownComponent,
    TestCoverageBannerComponent,
    DisplayProjectsChartViewComponent,
    DisplayProjectsCardViewComponent,
    BrowserAnimationsModule,
    TypeOfCardsDropdownComponent,
    ProjectDetailsViewComponent,
    HowFarWeGoBackDropdownComponent,
    DisplayProjectsDashboardViewComponent,
    SortDashboardDropdownComponent,
  ],
})
export class SharedModule {}
