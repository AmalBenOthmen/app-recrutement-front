import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HetFComponent } from './Layouts/template-layouts/HeaderEtFooter/het-f/het-f.component';
import { HomeComponent } from './Layouts/template-layouts/Home/home/home.component';
import { BrowseJobComponent } from './Layouts/template-layouts/browse-job/browse-job.component';
import { JobDetailsComponent } from './Layouts/template-layouts/job-details/job-details/job-details.component';
import { ContactComponent } from './Layouts/template-layouts/Contact/contact/contact.component';
import { StatisticsComponent } from './Layouts/template-layouts/statistic job/statistics/statistics.component';
import { AboutUsComponent } from './Layouts/template-layouts/About-COFICAB-Group/about-us/about-us.component';
import { MissionValueComponent } from './Layouts/template-layouts/Our Mission & Values/mission-value/mission-value.component';
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { ActivateAccountComponent } from "./views/activate-account/activate-account.component";



import {AdminDashboardComponent} from "./Layouts/admin-template-layout/admin-dashboard/admin-dashboard.component";

import {CreateJobPostsComponent} from "./views/admin/create-job-posts/create-job-posts.component";
import {authGuard} from "./auth.guard";
import {JobApplicationComponent} from "./views/user/job-application/job-application.component";
import {GetAllJobPostsComponent} from "./views/admin/get-all-job-posts/get-all-job-posts.component";
import {
  GetAllJobApplicationByJobpostIdComponent
} from "./views/admin/get-all-job-application-by-jobpost-id/get-all-job-application-by-jobpost-id.component";
import {
  FavoriteJobApplicationListComponent
} from "./views/admin/favorite-job-application-list/favorite-job-application-list.component";
import {MessagesReceivedComponent} from "./views/admin/messages-received/messages-received.component";


export const routes: Routes = [
  {
    path: '',
    component: HetFComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'activate-account', component: ActivateAccountComponent },
      { path: '', component: HomeComponent },
      { path: 'browseJob', component: BrowseJobComponent, canActivate: [authGuard] },
      { path: 'job-details/:id', component: JobDetailsComponent, canActivate: [authGuard] },
      { path: 'contact', component: ContactComponent },
      { path: 'job-statistics', component: StatisticsComponent, canActivate: [authGuard] },
      { path: 'about-coficab-group', component: AboutUsComponent },
      { path: 'mission-value', component: MissionValueComponent },
      { path: 'vision-strategy', component: MissionValueComponent },
      {path:'jobApplicationForm', component: JobApplicationComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'create-jobPosts', component: CreateJobPostsComponent},
      {path:'get-all-jobPosts',component: GetAllJobPostsComponent},
      { path: 'get-all-jobApplicationForm-by-jobPost/:id', component: GetAllJobApplicationByJobpostIdComponent },
      {path:'get-Favorite-jobAPP-list',component: FavoriteJobApplicationListComponent},
      { path: 'messages-received', component: MessagesReceivedComponent }
 ] }






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
