import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogService } from './dialog.service';
import { BetOdds, DialogData, PolyfunctionalArea } from './products.model';
import { WindowSize } from '../services/utility/window-size/window-size.model';
import { WindowSizeService } from '../services/utility/window-size/window-size.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public breakpoint = 1;
  public breakpointSubscribe: Subject<number>;

  public productNameSelectedSubscribe: Subject<string>;
  public productNameSelectedObserve: Observable<string>;

  public timeBlocked = false;
  public timeBlockedSubscribe: Subject<boolean>;

  private dialogProductDataSubject: Subject<BetOdds>;

  private playableBoardResetSubject: Subject<boolean>;
  public playableBoardResetObserve: Observable<boolean>;

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
  constructor(public dialog: DialogService, private windowSizeService: WindowSizeService) {
    this.breakpointSubscribe = new Subject<number>();
    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();
    // Element for management the display
    this.polyfunctionalAreaSubject = new Subject<PolyfunctionalArea>();
    this.polyfunctionalAreaObservable = this.polyfunctionalAreaSubject.asObservable();
    // time block
    this.timeBlockedSubscribe = new Subject<boolean>();
    this.timeBlockedSubscribe.asObservable().subscribe((timeBlocked: boolean) => {
      this.timeBlocked = timeBlocked;
    });
    // Dialog management
    this.dialogProductDataSubject = new Subject<BetOdds>();
    this.dialogProductDataSubject.asObservable().subscribe((odds: BetOdds) => {
      this.dialog.openDialog(new DialogData(odds, this.breakpoint));
    });

    this.playableBoardResetSubject = new Subject<boolean>();
    this.playableBoardResetObserve = this.playableBoardResetSubject.asObservable();
  }

  fnWindowsSize(): void {
    this.windowSize = this.windowSizeService.getWindowSize();
  }

  openProductDialog(data: BetOdds): void {
    this.dialogProductDataSubject.next(data);
  }

  closeProductDialog(): void {
    this.dialog.closeDialog();
  }

  resetBoard(): void {
    this.playableBoardResetSubject.next(true);
    this.playableBoardResetSubject.next(false);
  }
}
