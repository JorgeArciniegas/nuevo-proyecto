import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MappingUrls } from './app.mappingurl';
import { LoaderService } from './services/utility/loader/loader.service';
import { RouterService } from './services/utility/router/router.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoaderService, private router: RouterService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (!this.checkHasBearer(request.url)) {
      this.requests.push(request);
      this.loaderService.isLoading.next(true);
      return Observable.create(observer => {
        const subscription = next.handle(request)
          .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                this.removeRequest(request);
                observer.next(event);
              }
            },
            err => {

              console.error('error request', err);
              this.removeRequest(request);
              observer.error(err);
            },
            () => {
              this.removeRequest(request);
              observer.complete();
            });
        // remove request from queue when cancelled
        return () => {
          this.removeRequest(request);
          subscription.unsubscribe();
        };
      });
    } else {
      return next.handle(request);
    }
  }

  private removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
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
