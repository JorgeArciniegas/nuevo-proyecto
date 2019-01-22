import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { BetOdds, PolyfunctionalArea, WindowSize } from './products.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public breakpoint = 1;
  public breakpointSubscribe: Subject<number>;

  public productNameSelectedSubscribe: Subject<string>;
  public productNameSelectedObserve: Observable<string>;

  private dialogProductDataSubject: Subject<BetOdds>;
  private dialogProductRef = null;

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
  constructor(public dialog: MatDialog) {
    this.breakpointSubscribe = new Subject<number>();
    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();
    // Element for management the display
    this.polyfunctionalAreaSubject = new Subject<PolyfunctionalArea>();
    this.polyfunctionalAreaObservable = this.polyfunctionalAreaSubject.asObservable();
    // Dialog management
    this.dialogProductDataSubject = new Subject<BetOdds>();
    this.dialogProductDataSubject
      .asObservable()
      .subscribe((data: BetOdds) => {
        console.log('open dialog');
        this.dialogProductRef = this.dialog.open(ProductDialogComponent, {
          data: data
        });
      });
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

  openProductDialog(data: BetOdds): void {
    this.dialogProductDataSubject.next(data);
  }

  closeProductDialog(): void {
    if (this.dialogProductRef != null) {
      this.dialogProductRef.close();
    }
  }
}
