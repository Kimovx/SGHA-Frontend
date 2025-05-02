import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const username = '11240522';
  const password = '60-dayfreetrial';
  const authHeader = 'Basic ' + btoa(`${username}:${password}`);

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: authHeader
    }
  });

  return next(clonedRequest);
};
