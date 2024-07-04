import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  clientID = "0";
  hdrID = "0";

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    // if (currentUser && currentUser.token) {
    //   let contentType = 'application/json';
    //   if (request.body instanceof FormData) {
    //     contentType = 'multipart/form-data; boundary=----WebKitFormBoundary3RAv0QBNFklBzNvo';
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `bearer ${currentUser.token}`
    //       }
    //     });
    //   }
    //   else {
    //     request = request.clone({
    //       setHeaders: {
    //         'Content-Type': contentType,
    //         'charset': 'utf-8',
    //         Authorization: `bearer ${currentUser.token}`
    //       }
    //     });
    //   }

    // }

    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          let currentUser = JSON.parse(localStorage.getItem('currentUser')!);

          if (currentUser.userID != 0) {
            this.router.navigate(['login']);
          }
        }
      }));
  }
}
