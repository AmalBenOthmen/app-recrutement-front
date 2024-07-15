import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './Layouts/template-layouts/Home/home/home.component';
import { BrowseJobComponent } from './Layouts/template-layouts/browse-job/browse-job.component';
import { HetFComponent } from './Layouts/template-layouts/HeaderEtFooter/het-f/het-f.component';
import { JobDetailsComponent } from './Layouts/template-layouts/job-details/job-details/job-details.component';
import { LoginComponent } from "./views/login/login.component";
import { HttpTokenInterceptor } from "./interceptor/http-token.interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateJobPostsComponent } from "./views/admin/create-job-posts/create-job-posts.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppComponent,
    HomeComponent,
    BrowseJobComponent,
    HetFComponent,
    JobDetailsComponent,
    CreateJobPostsComponent,
    LoginComponent,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
