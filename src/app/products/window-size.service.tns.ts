import { Injectable } from '@angular/core';
import { screen } from 'tns-core-modules/platform';
import { WindowSize } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  constructor() {}

  getWindowSize(): WindowSize {
    const h: number = screen.mainScreen.heightPixels;
    const w: number = screen.mainScreen.widthPixels;
    const aspectRatio: number = w / h;
    const hgeneral = h - (h * 7) / 100;
    const dataAtt: WindowSize = {
      height: h,
      width: w,
      aspectRatio: aspectRatio,
      columnHeight: hgeneral
    };

    return dataAtt;
  }
}
