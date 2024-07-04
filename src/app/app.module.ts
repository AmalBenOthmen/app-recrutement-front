import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './Layouts/template-layouts/Home/home/home.component';
import { BrowseJobComponent } from './Layouts/template-layouts/browse-job/browse-job.component';
import { HetFComponent } from './Layouts/template-layouts/HeaderEtFooter/het-f/het-f.component';
import { JobDetailsComponent } from './Layouts/template-layouts/job-details/job-details/job-details.component';
import {LoginComponent} from "./views/login/login.component";

@NgModule({
  declarations: [
AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JobDetailsComponent,
    HetFComponent,
    BrowseJobComponent,
    HomeComponent,
    AppComponent,
    LoginComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
