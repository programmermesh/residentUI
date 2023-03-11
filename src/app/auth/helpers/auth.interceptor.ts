import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let authReq = req;
    const token = sessionStorage.getItem('token');
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return next.handle(authReq).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error: any) => {
          
            this.router.navigate(['login']);
        }
      )
    );
  }
}
