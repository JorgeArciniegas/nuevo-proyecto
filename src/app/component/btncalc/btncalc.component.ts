import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeBetSlipColTot } from 'src/app/products/dogracing/dogracing.models';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { PolyfunctionalArea, PolyfunctionalStakeCoupon } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { CouponService } from '../coupon/coupon.service';
import { BtncalcService } from './btncalc.service';

@Component({
  selector: 'app-btncalc',
  templateUrl: './btncalc.component.html',
  styleUrls: ['./btncalc.component.scss']
})
export class BtncalcComponent implements OnInit, OnDestroy {
  productNameSelectedSubscribe: Subscription;
  product: Product;
  @Input()
  rowHeight: number;
  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalArea: PolyfunctionalArea;
  displayDefaultAmount = 0.00;
  isActiveTot = false;
  isActiveCol = false;

  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;
  CouponoddStakeEditObs: Subscription;
  couponResponseSubs: Subscription;
  constructor(
    public productService: ProductsService,
    public btncalcService: BtncalcService,
    private readonly appSetting: AppSettings,
    private couponService: CouponService
  ) {
    this.productNameSelectedSubscribe = this.productService.productNameSelectedObserve.subscribe(
      v => {
        const product: Product[] = appSetting.products.filter(
          item => item.name === v
        );
        this.product = product[0];
      }
    );
    // manages buttons COL/TOT, label amount in display, amount association/distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalArea = element;
        if (this.polyfunctionalArea && this.polyfunctionalArea.odds) {
          this.isActiveCol = this.polyfunctionalArea.activeAssociationCol;
          this.isActiveTot = this.polyfunctionalArea.activeDistributionTot;
        } else {
          this.isActiveCol = true;
          this.isActiveTot = false;
        }
      }
    );
    // management coupon stake changed
    this.CouponoddStakeEditObs = this.couponService.oddStakeEditObs.subscribe( oddStakeEdit => {
        this.productService.polyfunctionalStakeCouponSubject.next(new PolyfunctionalStakeCoupon());
    });

    this.couponResponseSubs = this.couponService.couponResponse.subscribe( coupon => {
      if (coupon === null) {
        this.productService.polyfunctionalStakeCouponSubject.next(new PolyfunctionalStakeCoupon());
      }
    });

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.productNameSelectedSubscribe.unsubscribe();
    this.polyfunctionalValueSubscribe.unsubscribe();
    this.CouponoddStakeEditObs.unsubscribe();
    this.couponResponseSubs.unsubscribe();
  }

  async plus(): Promise<void> {
    this.displayDefaultAmount = 0;
    if (this.couponService.oddStakeEdit) {
      this.couponService.updateCoupon();
      return;
    }
    if (this.btncalcService.polyfunctionalStakeCoupon.isEnabled) {
      this.updateCouponStake();
      return;
    }
    await this.couponService.addRemoveToCoupon(this.polyfunctionalArea.odds);

    // this.btncalcService.polyfunctionalArea.amount = 1;
    this.productService.closeProductDialog();
    this.productService.resetBoard();
    this.polyfuncionalAmountReset();
  }

  clearAll(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();
    this.isActiveTot = false;
    this.isActiveCol = false;
    if (this.btncalcService.polyfunctionalArea) {
      this.btncalcService.polyfunctionalArea.amount = 1;
    }
    this.btncalcService.polyfunctionalAdditionFlag = true;
    this.btncalcService.polyfunctionalDecimalsFlag = true;
    this.displayDefaultAmount = 0.00;
    /* this.amountSetToPolyfunctionalStakeCoupon(); */
    this.productService.polyfunctionalStakeCouponSubject.next(new PolyfunctionalStakeCoupon());
  }

  polyfuncionalAmountReset(): void {
    // this.btncalcService.polyfunctionalArea.amount = 1;
    if (this.couponService.oddStakeEdit) {
      this.couponService.oddStakeEdit.tempStake = 0.00;
      this.couponService.oddStakeEditSubject.next(this.couponService.oddStakeEdit);
     }
    this.btncalcService.polyfunctionalAdditionFlag = true;
    this.btncalcService.polyfunctionalDecimalsFlag = true;
    this.productService.polyfunctionalAreaSubject.next(
      this.btncalcService.polyfunctionalArea
    );
    this.displayDefaultAmount = 0.00;
    this.amountSetToPolyfunctionalStakeCoupon();
  }

  // increments amount in display by preset default values
  btnDefaultAmountsPreset(amount: number): void {
    if (this.couponService.oddStakeEdit) {
      if (!this.couponService.oddStakeEdit.isDefaultInput) {
        this.couponService.oddStakeEdit.tempStake = 0;
        this.couponService.oddStakeEdit.isDefaultInput = true;
      }
      this.couponService.oddStakeEdit.tempStake += amount;
    } else {
      this.btncalcService.btnDefaultAmountAddition(amount);
    }
  }

  // increments digits in display amount
  btnAmountSet(amount: number): void {
    if (this.couponService.oddStakeEdit) {

      if (this.couponService.oddStakeEdit.isDefaultInput) {
        this.couponService.oddStakeEdit.tempStake = 0;
        this.couponService.oddStakeEdit.isDefaultInput = false;
      }

      this.couponService.oddStakeEdit.tempStake =
      this.btncalcService.btnAmountDecimalsChangeOdd(amount, this.couponService.oddStakeEdit.tempStake);
    } else if (this.couponService.coupon && !this.couponService.oddStakeEdit) {
      this.displayDefaultAmount =  this.btncalcService.btnAmountDecimalsChangeOdd(amount, this.displayDefaultAmount);
      const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
      if (this.btncalcService.polyfunctionalStakeCoupon.typeSlipCol === TypeBetSlipColTot.COL) {
        amountTemp.totalAmount = this.displayDefaultAmount * this.couponService.coupon.Odds.length ;
        amountTemp.columnAmount = this.displayDefaultAmount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.COL;
      } else if (this.btncalcService.polyfunctionalStakeCoupon.typeSlipCol === TypeBetSlipColTot.TOT) {
        amountTemp.columnAmount =  this.displayDefaultAmount / this.couponService.coupon.Odds.length;
        amountTemp.totalAmount = this.displayDefaultAmount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.TOT;
      }
      amountTemp.isEnabled = true;
      amountTemp.columns = this.couponService.coupon.Odds.length;
      amountTemp.digitAmount = this.displayDefaultAmount;
      this.productService.polyfunctionalStakeCouponSubject.next(amountTemp);
    } else {
      this.btncalcService.btnAmountDecimals(amount);
    }
  }

  // TOT/distribution & COL/association buttons enabling
  btnTotColSet(betTotColSelected: TypeBetSlipColTot): void {
   if (betTotColSelected === TypeBetSlipColTot.COL) {
     this.isActiveCol = true;
     this.isActiveTot = false;
   } else if (betTotColSelected === TypeBetSlipColTot.TOT) {
    this.isActiveCol = false;
    this.isActiveTot = true;
  }
    this.amountSetToPolyfunctionalStakeCoupon();
    this.btncalcService.btnTotColSelection(betTotColSelected);
  }

  // reset polyfunctional Stake coupon
  amountSetToPolyfunctionalStakeCoupon(): void {
    if (!this.btncalcService.polyfunctionalStakeCoupon.isEnabled) {
      return;
    }
    const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
    if (this.isActiveCol) {
      amountTemp.totalAmount = this.displayDefaultAmount * this.couponService.coupon.Odds.length ;
      amountTemp.columnAmount = this.displayDefaultAmount;
      amountTemp.typeSlipCol = TypeBetSlipColTot.COL;
    } else if (this.isActiveTot) {
      amountTemp.columnAmount =  this.displayDefaultAmount / this.couponService.coupon.Odds.length;
      amountTemp.totalAmount = this.displayDefaultAmount;
      amountTemp.typeSlipCol = TypeBetSlipColTot.TOT;
    }
    amountTemp.isEnabled = true;
    amountTemp.columns = this.couponService.coupon.Odds.length;
    amountTemp.digitAmount = this.displayDefaultAmount;
    this.productService.polyfunctionalStakeCouponSubject.next(amountTemp);
  }


  // updated global amount to coupon
  private updateCouponStake(): void {
    if (this.couponService.coupon && this.btncalcService.polyfunctionalStakeCoupon.isEnabled) {
      this.couponService.coupon.Odds.forEach( item => {
        item.OddStake = this.btncalcService.polyfunctionalStakeCoupon.columnAmount;
      });
      this.couponService.updateCoupon();
      this.clearAll();
    }
  }
}
