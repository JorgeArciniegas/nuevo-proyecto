import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ElysApiService } from '@elys/elys-api';
import { Observable, Subject } from 'rxjs';
import { Products } from '../../../src/environments/environment.models';
import { AppSettings } from '../app.settings';
import { StorageService } from '../services/utility/storage/storage.service';
import { WindowSize } from '../services/utility/window-size/window-size.model';
import { WindowSizeService } from '../services/utility/window-size/window-size.service';
import { DialogService } from './dialog.service';
import { BetDataDialog, DialogData, PolyfunctionalArea, PolyfunctionalStakeCoupon } from './products.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public breakpoint = 1;

  public productNameSelectedSubscribe: Subject<string>;
  public productNameSelectedObserve: Observable<string>;

  public timeBlocked = false;
  public timeBlockedSubscribe: Subject<boolean>;

  private dialogProductDataSubject: Subject<BetDataDialog>;

  private playableBoardResetSubject: Subject<boolean>;
  public playableBoardResetObserve: Observable<boolean>;

  // polifunctional area object declare
  polyfunctionalAreaSubject: Subject<PolyfunctionalArea>;
  polyfunctionalAreaObservable: Observable<PolyfunctionalArea>;

  // polifunctional stake coupon
  polyfunctionalStakeCouponSubject: Subject<PolyfunctionalStakeCoupon>;
  polyfunctionalStakeCouponObs: Observable<PolyfunctionalStakeCoupon>;
  // tslint:disable-next-line:typedef
  gridByBreakpoint = {
    xl: 12,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };
  windowSize: WindowSize;
  // product selected
  product: Products;

  constructor(
    public dialog: DialogService,
    private windowSizeService: WindowSizeService,
    private appSetting: AppSettings,
    private elysApi: ElysApiService,
    private storage: StorageService) {
    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();

    // Element for management the display
    this.polyfunctionalAreaSubject = new Subject<PolyfunctionalArea>();
    this.polyfunctionalAreaObservable = this.polyfunctionalAreaSubject.asObservable();

    // stake coupon
    this.polyfunctionalStakeCouponSubject = new Subject<PolyfunctionalStakeCoupon>();
    this.polyfunctionalStakeCouponObs = this.polyfunctionalStakeCouponSubject.asObservable();

    // time block
    this.timeBlockedSubscribe = new Subject<boolean>();
    this.timeBlockedSubscribe.asObservable().subscribe((timeBlocked: boolean) => {
      this.timeBlocked = timeBlocked;
    });
    // Dialog management
    this.dialogProductDataSubject = new Subject<BetDataDialog>();
    this.dialogProductDataSubject.asObservable().subscribe((data: BetDataDialog) => {
      const dialogData: DialogData = new DialogData();
      dialogData.betOdds = data.betOdds;
      dialogData.betCoupon = data.betCoupon;
      dialogData.breakpoint = this.breakpoint;
      dialogData.title = data.title;
      this.dialog.openDialog(dialogData);
    });

    this.playableBoardResetSubject = new Subject<boolean>();
    this.playableBoardResetObserve = this.playableBoardResetSubject.asObservable();

    // updated product selected
    // this is only entry point to modify 'product'
    // the function that update it is changeProduct
    // appSetting.products = environment product
    this.productNameSelectedObserve.subscribe( v => {
      // mark the product not selected and return the item clicked
        const product: Products[] = appSetting.products.filter( item => {
          item.productSelected = false;
          return item.codeProduct === v;
        });
        // set the selected which product
        this.product = product[0];
        this.product.productSelected = true;
      }
    );
  }

  fnWindowsSize(): void {
    this.windowSize = this.windowSizeService.getWindowSize();
  }

  openProductDialog(data: BetDataDialog): void {
    this.dialogProductDataSubject.next(data);
  }

  closeProductDialog(): void {
    this.dialog.closeDialog();
  }

  resetBoard(): void {
    this.playableBoardResetSubject.next(true);
    this.playableBoardResetSubject.next(false);
    this.polyfunctionalStakeCouponSubject.next(new PolyfunctionalStakeCoupon());
  }


  /**
   *
   * @param codeProduct
   */
  changeProduct(codeProduct: string): void {
    this.productNameSelectedSubscribe.next(codeProduct);
  }
}
