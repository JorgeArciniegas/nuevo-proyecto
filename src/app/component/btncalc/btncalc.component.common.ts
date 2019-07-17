import { Subscription } from 'rxjs';
import { AppSettings } from '../../app.settings';
import {
  PolyfunctionalArea,
  PolyfunctionalStakeCoupon,
  PolyfunctionStakePresetPlayer
} from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/main/main.models';
import { CouponService } from '../coupon/coupon.service';
import { BtncalcService } from './btncalc.service';
import { TYPINGTYPE } from './btncalc.enum';
import { UserService } from '../../../../src/app/services/user.service';

export class BtncalcComponentCommon {
  polyfunctionalValueSubscribe: Subscription;
  public polyfunctionalArea: PolyfunctionalArea;
  typeBetSlipColTot: typeof TypeBetSlipColTot = TypeBetSlipColTot;
  CouponoddStakeEditObs: Subscription;
  couponResponseSubs: Subscription;
  constructor(
    public productService: ProductsService,
    public btncalcService: BtncalcService,
    public appSetting: AppSettings,
    private couponService: CouponService,
    private userService: UserService
  ) {
    // manages buttons COL/TOT, label amount in display, amount association/distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        this.polyfunctionalArea = element;
      }
    );
    // management coupon stake changed
    this.CouponoddStakeEditObs = this.couponService.oddStakeEditObs.subscribe(
      oddStakeEdit => {
        this.productService.polyfunctionalStakeCouponSubject.next(
          new PolyfunctionalStakeCoupon()
        );
      }
    );

    this.couponResponseSubs = this.couponService.couponResponse.subscribe(
      coupon => {
        if (coupon === null) {
          this.productService.polyfunctionalStakeCouponSubject.next(
            new PolyfunctionalStakeCoupon()
          );
        }
      }
    );
  }
  async plus(): Promise<void> {
    this.btncalcService.assignStake();
    if (this.userService.isModalOpen) {
      this.userService.isBtnCalcEditable = false;
    }
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
    // Check if the "shortcut method" is available for the selection
    if (this.polyfunctionalArea.shortcut) {
      await this.couponService.addRemoveToCouponSC(this.polyfunctionalArea);
    } else {
      await this.couponService.addRemoveToCoupon(this.polyfunctionalArea.odds);
    }

    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }

  clearAll(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();

    if (this.btncalcService.polyfunctionalArea) {
      this.btncalcService.polyfunctionalArea.amount = 1;
    }
    this.btncalcService.polyfunctionalAdditionFlag = true;
    this.btncalcService.polyfunctionalDecimalsFlag = true;

    /*
    // reset the input preset amount
    this.btncalcService.settingStakePresetPlayer(); */
    /* this.amountSetToPolyfunctionalStakeCoupon(); */
    this.productService.polyfunctionalStakeCouponSubject.next(
      new PolyfunctionalStakeCoupon()
    );
  }

  polyfuncionalAmountReset(): void {
    if (this.couponService.oddStakeEdit) {
      this.couponService.oddStakeEdit.tempStake = 0.0;
      this.couponService.oddStakeEditSubject.next(
        this.couponService.oddStakeEdit
      );
    }
    this.btncalcService.polyfunctionalAdditionFlag = true;
    this.btncalcService.polyfunctionalDecimalsFlag = true;
    this.productService.polyfunctionalAreaSubject.next(
      this.btncalcService.polyfunctionalArea
    );
    this.btncalcService.settingStakePresetPlayer();
  }

  // increments amount in display by preset default values
  btnDefaultAmountsPreset(amount: number): void {
    this.setStakePresetPlayer(amount, TYPINGTYPE.BY_PRESET);
  }

  btnKeyboardAmount(amount: number): void {
    this.setStakePresetPlayer(amount, TYPINGTYPE.BY_KEYBOARD);
  }

  /**
   *
   * @param amount
   */
  setStakePresetPlayer(amount: number, typingType: TYPINGTYPE): void {
    if (
      this.btncalcService.polyfunctionStakePresetPlayer
        .disableInputCalculator &&
      this.btncalcService.polyfunctionStakePresetPlayer.typingType ===
        typingType
    ) {
      return;
    }
    // check if this stake's change is on a coupon odd
    if (this.couponService.oddStakeEdit) {
      if (this.couponService.oddStakeEdit.isDefaultInput) {
        this.couponService.oddStakeEdit.tempStake = 0;
        this.couponService.oddStakeEdit.isDefaultInput = false;
      }
      // this fucntion setting the new value on the oddStake
      this.btncalcService.setAmountToOdd(
        amount,
        this.couponService.oddStakeEdit
      );
    } else {
      if (this.polyfunctionalArea && this.polyfunctionalArea.odds.length > 0) {
        this.btncalcService.polyfunctionStakePresetPlayer.isPreset = false;
      } else {
        this.btncalcService.polyfunctionStakePresetPlayer.isPreset = true;
      }

      this.btncalcService.polyfunctionStakePresetPlayer.amount = this.btncalcService.returnTempNumberToPolyfuncArea(
        amount,
        typingType
      );
      this.btncalcService.polyfunctionStakePresetPlayerSub.next(
        this.btncalcService.polyfunctionStakePresetPlayer
      );
    }
  }

  btnSeparatorSet(): void {
    this.btncalcService.setDecimal();
  }

  // TOT/distribution & COL/association buttons enabling
  btnTotColSet(betTotColSelected: TypeBetSlipColTot): void {
    this.btncalcService.btnTotColSelection(betTotColSelected);
  }

  // updated global amount to coupon
  private updateCouponStake(): void {
    if (
      this.couponService.coupon &&
      this.btncalcService.polyfunctionalStakeCoupon.isEnabled
    ) {
      this.couponService.coupon.Odds.forEach(item => {
        item.OddStake = this.btncalcService.polyfunctionalStakeCoupon.columnAmount;
      });
      this.couponService.updateCoupon();
      this.clearAll();
    }
  }
}
