import { Injectable } from '@angular/core';
import { WindowSize } from './window-size.model';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  constructor() {}

  getWindowSize(): WindowSize {
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

    return dataAtt;
  }
}
