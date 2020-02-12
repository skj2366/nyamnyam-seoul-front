import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var cuiId = localStorage.getItem('cuiId');
    var tokken = localStorage.getItem('tokken');
    var headers: HttpHeaders = new HttpHeaders();
    console.log(req);
    if ((req.url.indexOf('login') == -1 && req.url.indexOf('cui') == -1 && req.url.indexOf('send') == -1 && req.url.indexOf('cuc') == -1) && !tokken) {
      console.log(req.url.indexOf('cui'));
      this._router.navigate(['/login']);
      return throwError('Auth Error');
    } else if (tokken) {
      headers = new HttpHeaders().set('x-auth-id', cuiId).set('x-auth-tokken', tokken);
    }
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }

}
