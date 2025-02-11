import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => ({
        statusCode: error?.status,
        message: error?.error?.message ?? ''
      }))
    })
  )
}
