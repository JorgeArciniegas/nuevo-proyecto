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
    this.btncalcService.tapPlus();
  }

  clearAll(): void {
   this.btncalcService.clearAll();
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

}
