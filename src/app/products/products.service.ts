import { Injectable } from '@angular/core';
import {
  ElysApiService,
  CurrencyCodeResponse,
  CurrencyCodeRequest
} from '@elys/elys-api';
import { Observable, Subject } from 'rxjs';
import { Products, LayoutProducts } from '../../../src/environments/environment.models';
import { AppSettings } from '../app.settings';
import { DestroyCouponService } from '../component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { CouponService } from '../component/coupon/coupon.service';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/utility/router/router.service';
import { StorageService } from '../services/utility/storage/storage.service';
import { WindowSize } from '../services/utility/window-size/window-size.model';
import { WindowSizeService } from '../services/utility/window-size/window-size.service';
import { DialogService } from './dialog.service';
import { ProductsServiceExtra } from './product.service.extra';
import {
  BetDataDialog,
  DialogData,
  PolyfunctionalArea,
  PolyfunctionalStakeCoupon,
  PolyfunctionStakePresetPlayer
} from './products.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ProductsServiceExtra {
  public breakpoint = 1;

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

  constructor(
    public dialog: DialogService,
    private windowSizeService: WindowSizeService,
    private appSetting: AppSettings,
    private elysApi: ElysApiService,
    private storage: StorageService,
    public couponInternalService: CouponService,
    public destroyCouponService: DestroyCouponService,
    public router: RouterService,
    private userservice: UserService
  ) {
    super(couponInternalService, destroyCouponService, router);
    // Destroy coupon confirmation
    this.couponInternalService.productHasCoupon = { checked: false };

    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();

    // Element for management the display
    this.polyfunctionalAreaSubject = new Subject<PolyfunctionalArea>();
    this.polyfunctionalAreaObservable = this.polyfunctionalAreaSubject.asObservable();

    // stake coupon
    this.polyfunctionalStakeCouponSubject = new Subject<
      PolyfunctionalStakeCoupon
    >();
    this.polyfunctionalStakeCouponObs = this.polyfunctionalStakeCouponSubject.asObservable();

    // time block
    this.timeBlockedSubscribe = new Subject<boolean>();
    this.timeBlockedSubscribe
      .asObservable()
      .subscribe((timeBlocked: boolean) => {
        this.timeBlocked = timeBlocked;
      });
    // Dialog management
    this.dialogProductDataSubject = new Subject<BetDataDialog>();
    this.dialogProductDataSubject
      .asObservable()
      .subscribe((data: BetDataDialog) => {
        const dialogData: DialogData = new DialogData();
        dialogData.betOdds = data.betOdds;
        dialogData.betCoupon = data.betCoupon;
        dialogData.breakpoint = this.breakpoint;
        dialogData.title = data.title;
        dialogData.statistics = data.statistics;
        this.dialog.openDialog(dialogData);
      });

    this.playableBoardResetSubject = new Subject<boolean>();
    this.playableBoardResetObserve = this.playableBoardResetSubject.asObservable();

    // updated product selected
    // This is the only entry point to modify 'product'
    // the function that update it is changeProduct
    // appSetting.products = environment product
    this.productNameSelectedObserve.subscribe(v => {
      // mark the product not selected and return the item clicked
      const product: Products[] = appSetting.products.filter(item => {
        item.productSelected = false;
        return item.codeProduct === v;
      });
      // set the selected product
      this.product = product[0];
      this.product.productSelected = true;
      // confirm destroy coupon
      this.resetBoard();
      this.couponInternalService.productHasCoupon = {
        checked: false,
        productCodeRequest: v
      };
    });
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
   * @returns LayoutProducts from current product selected
   */
  public getCurrentLayoutProducts(): Promise<LayoutProducts> {

    const response: Promise<LayoutProducts> = new Promise<LayoutProducts>(
      (resolve, reject) => {
        resolve(this.product.layoutProducts);
        reject(new Error('LayoutProducts not found'));
      });
    return response;
  }

}
