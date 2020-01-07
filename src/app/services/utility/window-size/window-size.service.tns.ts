import { Injectable } from '@angular/core';
import { screen } from 'tns-core-modules/platform';
import { WindowSize } from './window-size.model';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  public windowSize: WindowSize;
  constructor() { }

  initWindowSize(): void {
    const h: number = screen.mainScreen.heightDIPs;
    const w: number = screen.mainScreen.widthDIPs;
    const aspectRatio: number = w / h;
    const hgeneral = h - h / 13;
    this.windowSize = {
      height: h,
      width: w,
      aspectRatio: aspectRatio,
      columnHeight: hgeneral,
      small: aspectRatio > 1.45 && screen.mainScreen.heightPixels < 1500
    };
  }
}
