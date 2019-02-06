import { Injectable } from '@angular/core';
import { screen } from 'tns-core-modules/platform';
import { WindowSize } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  constructor() {}

  getWindowSize(): WindowSize {
    const h: number = screen.mainScreen.heightDIPs;
    const w: number = screen.mainScreen.widthDIPs;
    const aspectRatio: number = w / h;
    const hgeneral = h - h / 13;
    const dataAtt: WindowSize = {
      height: h,
      width: w,
      aspectRatio: aspectRatio,
      columnHeight: hgeneral,
      small: aspectRatio > 1.45
    };

    console.log('aspectRatio', aspectRatio);

    return dataAtt;
  }
}
