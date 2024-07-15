/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobPostResponse } from '../../models/job-post-response';

export interface FindJobPostById$Params {
  'job-post-id': number;
}

export function findJobPostById(http: HttpClient, rootUrl: string, params: FindJobPostById$Params, context?: HttpContext): Observable<StrictHttpResponse<JobPostResponse>> {
  const rb = new RequestBuilder(rootUrl, findJobPostById.PATH, 'get');
  if (params) {
    rb.path('job-post-id', params['job-post-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JobPostResponse>;
    })
  );
}

findJobPostById.PATH = '/job-posts/{job-post-id}';
