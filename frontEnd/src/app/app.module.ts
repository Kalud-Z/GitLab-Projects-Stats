import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GroupsModule } from './groups/groups.module';
import { AppRoutingModule } from './app-routing.module';
import { ProjectsModule } from './projects/projects.module';
import { CdTimerModule } from 'angular-cd-timer';
import { SharedModule } from './shared/shared.module';
import { FileSaverModule } from 'ngx-filesaver';
import { ChartsModule } from "ng2-charts";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    GroupsModule,
    ProjectsModule,
    AppRoutingModule,
    CdTimerModule,
    SharedModule,
    FileSaverModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }


