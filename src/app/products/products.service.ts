import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PolyfunctionalArea, WindowSize } from './products.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  breakpoint = 1;
  breakpointSubscribe: Subject<number>;

  productNameSelectedSubscribe: Subject<string>;
  productNameSelectedObserve: Observable<string>;

  // polifunctional area object declare
  polyfunctionalAreaSubject: Subject<PolyfunctionalArea>;
  polyfunctionalAreaObservable: Observable<PolyfunctionalArea>;
  // tslint:disable-next-line:typedef
  gridByBreakpoint = {
    xl: 12,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };
  windowSize: WindowSize;
  constructor() {
    this.breakpointSubscribe = new Subject<number>();
    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();
    // Element for management the display
    this.polyfunctionalAreaSubject = new Subject<PolyfunctionalArea>();
    this.polyfunctionalAreaObservable = this.polyfunctionalAreaSubject.asObservable();
  }

  fnWindowsSize(): WindowSize {
    const doc: HTMLElement = document.querySelector('html');
    const h: number = doc.offsetHeight;
    const w: number = doc.offsetWidth;
    const aspectRatio: number = w / h;
    const hgeneral = h - (h * 7) / 100;
    // tslint:disable-next-line:typedef
    const dataAtt: WindowSize = {
      height: h,
      width: w,
      aspectRatio: aspectRatio,
      columnHeight: hgeneral
    };

    dataAtt.height = dataAtt.width / aspectRatio;

    this.windowSize = dataAtt;
    return dataAtt;
  }
}
