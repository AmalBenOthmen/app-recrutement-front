import { HttpInterceptorFn } from '@angular/common/http';

export const simpleInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Simple Interceptor called'); // Log when interceptor is called
  return next(req);
};
