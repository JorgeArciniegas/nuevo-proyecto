import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request);
  }

  /**
   * Return current token
   *
   * @returns string
   */
  public getCurrentToken(): string {
    return localStorage.getItem('tokenData');
  }

  /**
   * Return HTTP header with auth token
   *
   * @returns HttpHeaders
   */
  public getHttpJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.getCurrentToken()
    });
  }
}
