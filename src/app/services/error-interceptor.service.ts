import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor(private toastrService: ToastrService) { }
  intercept(reqest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(reqest).pipe(
      retry(1),
      catchError((err) => {
        let message = ""
        if (err.status === 401) {
          message = "Unauthorized"
          
        }
        else if (err.status === 404) {
          message = "The phone number is already taken"

        }
        else if (err.status === 400) {
          message = "Bad Request"
          
        }
        else {
          message = "Unexpected error"
        }
        this.toastrService.error(message)
        return throwError(err)
      }) 
    )
    
  }
}
