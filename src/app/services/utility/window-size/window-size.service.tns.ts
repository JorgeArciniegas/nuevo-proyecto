import { Injectable } from '@angular/core';
import { Screen } from '@nativescript/core';
import { WindowSize } from './window-size.model';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  public windowSize: WindowSize;
  constructor() { }

  initWindowSize(): void {
    const h: number = Screen.mainScreen.heightDIPs;
    const w: number = Screen.mainScreen.widthDIPs;
    const aspectRatio: number = w / h;
    const hgeneral = h - h / 13;
    this.windowSize = {
      height: h,
      width: w,
      aspectRatio: aspectRatio,
      columnHeight: hgeneral,
      small: aspectRatio > 1.45 && Screen.mainScreen.heightPixels < 1500
    };
  }
}
