import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse)=> {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      message = `Error: ${error.error.message}`;
    } else if (error.status === 0) {
      message = 'Error: No se pudo conectar con el servidor';
    } else if (error.status === 400 && error.error && error.error.errors) {
      const validationErrors = error.error.errors;
      return throwError(() => validationErrors);
    } else if (error.error && error.error.message) {
      message = error.error.message;
    } else {
      message = `Error code: ${error.status}, message: ${error.message}`;
    }
    return throwError(() => message);
  }))
};
