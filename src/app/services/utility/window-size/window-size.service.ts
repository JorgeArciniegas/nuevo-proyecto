import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WindowSize } from './window-size.model';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  public windowSize: WindowSize;

  public windowSize$: BehaviorSubject<WindowSize> = new BehaviorSubject(null);
  constructor() { }


  initWindowSize(): void {
    console.log('initWindowSize_v3');
    const doc: HTMLElement = document.querySelector('html');
    const h: number = doc.offsetHeight;
    const w: number = doc.offsetWidth;
    const aspectRatio: number = w / h;
    const hgeneral = h - (h * 7) / 100;
    this.windowSize = {
      height: h,
      width: w,
      aspectRatio: aspectRatio,
      columnHeight: hgeneral
    };
    this.windowSize$.next(this.windowSize);
    console.log('this.windowSize: ', JSON.parse(JSON.stringify(this.windowSize)))
  }
}
