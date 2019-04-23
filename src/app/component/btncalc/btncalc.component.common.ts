import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Product } from '../../products/models/product.model';
import { PolyfunctionalArea } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { BtncalcService } from './btncalc.service';
import { TypeBetSlipColTot } from '../../products/dogracing/dogracing.models';
import { CouponService } from '../coupon/coupon.service';


export class BtncalcComponentCommon {
  productNameSelectedSubscribe: Subscription;
  product: Product;

  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalArea: PolyfunctionalArea;
  displayDefaultAmount: number;
  isActiveTot = false;
  isActiveCol = false;

  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;

  constructor(
    public productService: ProductsService,
    public btncalcService: BtncalcService,
    private appSetting: AppSettings,
    private couponService: CouponService
  ) {
    this.productNameSelectedSubscribe = this.productService.productNameSelectedObserve.subscribe(
      v => {
        const product: Product[] = this.appSetting.products.filter(
          item => item.name === v
        );
        this.product = product[0];
        this.displayDefaultAmount = product[0].defaultAmount[0];
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
          this.isActiveCol = false;
          this.isActiveTot = false;
        }
      }
    );
  }

  async plus(): Promise<void> {
    if (this.couponService.oddStakeEdit) {
      this.couponService.updateCoupon();
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
    } else {
      this.btncalcService.btnAmountDecimals(amount);
    }
  }

  // TOT/distribution & COL/association buttons enabling
  btnTotColSet(betTotColSelected: TypeBetSlipColTot): void {
    this.btncalcService.btnTotColSelection(betTotColSelected);
  }
}
