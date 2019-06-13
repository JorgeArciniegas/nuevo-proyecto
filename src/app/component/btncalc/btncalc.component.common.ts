import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { PolyfunctionalArea, PolyfunctionalStakeCoupon, PolyfunctionStakePresetPlayer } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/racing/racing.models';
import { CouponService } from '../coupon/coupon.service';
import { BtncalcService } from './btncalc.service';


export class BtncalcComponentCommon {

  polyfunctionalValueSubscribe: Subscription;
  public polyfunctionalArea: PolyfunctionalArea;
  displayDefaultAmount = 0.00;
  isActiveTot = false;
  isActiveCol = false;
  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;
  CouponoddStakeEditObs: Subscription;
  couponResponseSubs: Subscription;
  constructor(
    public productService: ProductsService,
    public btncalcService: BtncalcService,
    public appSetting: AppSettings,
    private couponService: CouponService
  ) {

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
        // console.log('BtncalcComponentCommon: ', element, this.polyfunctionalArea);
      }
    );
    // management coupon stake changed
    this.CouponoddStakeEditObs = this.couponService.oddStakeEditObs.subscribe(oddStakeEdit => {
      this.productService.polyfunctionalStakeCouponSubject.next(new PolyfunctionalStakeCoupon());
    });

    this.couponResponseSubs = this.couponService.couponResponse.subscribe(coupon => {
      if (coupon === null) {
        this.productService.polyfunctionalStakeCouponSubject.next(new PolyfunctionalStakeCoupon());
      }
    });
  }
  async plus(): Promise<void> {
    this.displayDefaultAmount = 0;
    this.btncalcService.assignStake();

    if (this.couponService.oddStakeEdit) {
      this.couponService.updateCoupon();
      return;
    }
    if (this.btncalcService.polyfunctionalStakeCoupon.isEnabled) {
      this.updateCouponStake();
      return;
    }
    if (!this.polyfunctionalArea || !this.polyfunctionalArea.odds) {
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
    /*
    // reset the input preset amount
    this.btncalcService.settingStakePresetPlayer(); */
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
    // this.amountSetToPolyfunctionalStakeCoupon();
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

  /**
   *
   * @param amount
   */
  setStakePresetPlayer(amount: number): void {

    if ( this.btncalcService.polyfunctionStakePresetPlayer.disableInputCalculator ) {
      return;
    }

    if (this.couponService.oddStakeEdit) {
      if (this.couponService.oddStakeEdit.isDefaultInput) {
        this.couponService.oddStakeEdit.tempStake = 0;
        this.couponService.oddStakeEdit.isDefaultInput = false;
      }
      this.couponService.oddStakeEdit.tempStake =
        this.btncalcService.btnAmountDecimalsChangeOddFnPOS(amount, this.couponService.oddStakeEdit.tempStake);
    } else {
      if (this.polyfunctionalArea && this.polyfunctionalArea.odds.length > 0 ) {
        this.btncalcService.polyfunctionStakePresetPlayer.isPreset = false;
      } else {
        this.btncalcService.polyfunctionStakePresetPlayer.isPreset = true;
      }

      this.btncalcService.polyfunctionStakePresetPlayer.amount = this.btncalcService.returnTempNumberToPolyfuncArea(amount);
      this.productService.polyfunctionStakePresetPlayerSub.next(this.btncalcService.polyfunctionStakePresetPlayer);
    }



  }



  // increments digits in display amount
  btnAmountSet(amount: number): void {
    // tslint:disable-next-line:max-line-length
    if ( this.polyfunctionalArea  && this.polyfunctionalArea.disableInputCalculator) {
      return;
    }

    if (this.couponService.oddStakeEdit) {
      if (this.couponService.oddStakeEdit.isDefaultInput) {
        this.couponService.oddStakeEdit.tempStake = 0;
        this.couponService.oddStakeEdit.isDefaultInput = false;
      }

      this.couponService.oddStakeEdit.tempStake =
        this.btncalcService.btnAmountDecimalsChangeOddFnPOS(amount, this.couponService.oddStakeEdit.tempStake);
    } else if (this.couponService.coupon && !this.couponService.oddStakeEdit && !this.polyfunctionalArea.amountStr) {
      this.displayDefaultAmount = this.btncalcService.btnAmountDecimalsChangeOddFnPOS(amount, this.displayDefaultAmount);
      const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
      if (this.btncalcService.polyfunctionalStakeCoupon.typeSlipCol === TypeBetSlipColTot.COL) {
        amountTemp.totalAmount = this.displayDefaultAmount * this.couponService.coupon.Odds.length;
        amountTemp.columnAmount = this.displayDefaultAmount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.COL;
      } else if (this.btncalcService.polyfunctionalStakeCoupon.typeSlipCol === TypeBetSlipColTot.TOT) {
        amountTemp.columnAmount = this.displayDefaultAmount / this.couponService.coupon.Odds.length;
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

    /*
    if (this.polyfunctionalArea && !this.polyfunctionalArea.odds) {
      this.btncalcService.polyfunctionStakePresetPlayer.amount = this.polyfunctionalArea.amount;
      this.productService.polyfunctionStakePresetPlayerSub.next(this.btncalcService.polyfunctionStakePresetPlayer);
    } */
  }

  btnSeparatorSet(): void {
    this.btncalcService.setDecimal();
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
    try {

      if (!this.btncalcService.polyfunctionalStakeCoupon.isEnabled && this.polyfunctionalArea.selection) {
        return;
      }

      const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
      if (this.isActiveCol) {
        amountTemp.totalAmount = this.displayDefaultAmount * this.couponService.coupon.Odds.length;
        amountTemp.columnAmount = this.displayDefaultAmount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.COL;
      } else if (this.isActiveTot) {
        amountTemp.columnAmount = this.displayDefaultAmount / this.couponService.coupon.Odds.length;
        amountTemp.totalAmount = this.displayDefaultAmount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.TOT;
      }
      amountTemp.isEnabled = true;
      amountTemp.columns = this.couponService.coupon.Odds.length;
      amountTemp.digitAmount = this.displayDefaultAmount;
      this.productService.polyfunctionalStakeCouponSubject.next(amountTemp);
    } catch ( err ) {
      return;
    }

  }


  // updated global amount to coupon
  private updateCouponStake(): void {
    if (this.couponService.coupon && this.btncalcService.polyfunctionalStakeCoupon.isEnabled) {
      this.couponService.coupon.Odds.forEach(item => {
        item.OddStake = this.btncalcService.polyfunctionalStakeCoupon.columnAmount;
      });
      this.couponService.updateCoupon();
      this.clearAll();
    }
  }
}
