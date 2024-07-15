/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JobPostResponse } from '../../models/job-post-response';

export interface FindAllJobPosts$Params {
}

export function findAllJobPosts(http: HttpClient, rootUrl: string, params?: FindAllJobPosts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<JobPostResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllJobPosts.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<JobPostResponse>>;
    })
  );
}

findAllJobPosts.PATH = '/job-posts';
