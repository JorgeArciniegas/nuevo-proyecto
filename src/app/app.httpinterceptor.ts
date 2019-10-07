import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MappingUrls } from './app.mappingurl';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let clonedRequest: HttpRequest<any> = null;
    // check if the request url is on the mappingUrls
    if (this.checkHasBearer(request.url)) {
      // if checkHasBearer = true, clone the request and append the Bearer authorization
      clonedRequest = request.clone({
        headers: this.getHttpJsonHeaders()
      });
    } else {
      // return the original request
      clonedRequest = request.clone();
    }
    return next.handle(clonedRequest);
  }

  /**
   * check if the url request has a bearer token
   * @param url
   * @returns boolean true if the url has a corrispondence on the mappingUrls array
   */
  private checkHasBearer(url: string): boolean {
    let hasBearer = false;
    MappingUrls.map((k, i) => {
      if (url.search(k) > 0) {
        hasBearer = true;
      }
    });
    return hasBearer;
  }

  /**
   * Return current token
   *
   * @returns string
   */
  private getCurrentToken(): string {
    // return sessionStorage.getItem('tokenData')
    //   ? 'Bearer ' + sessionStorage.getItem('tokenData')
    //   : '';
    return '';
  }

  /**
   * Return HTTP header with auth token
   *
   * @returns HttpHeaders
   */
  private getHttpJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: this.getCurrentToken()
    });
  }
}
