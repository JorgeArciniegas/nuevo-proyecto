import { formatCurrency } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { AppSettings } from '../../../../src/app/app.settings';
import { UserService } from '../../../../src/app/services/user.service';
import { TranslateUtilityService } from '../../../../src/app/services/utility/translate-utility.service';
import { PolyfunctionalArea, PolyfunctionalStakeCoupon, PolyfunctionStakePresetPlayer } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/main/main.models';
import { CouponService } from '../coupon/coupon.service';
import { TYPINGTYPE } from './btncalc.enum';
import { OddsStakeEdit } from '../coupon/coupon.model';

@Injectable({
  providedIn: 'root',
  deps: [ UserService ]
})
export class BtncalcService implements OnDestroy {
  polyfunctionalValueSubscribe: Subscription;
  polyfunctionalArea: PolyfunctionalArea;
  iniPresetAmountProduct: number;
  polyfunctionalAdditionFlag: boolean;
  polyfunctionalDecimalsFlag: boolean;
  stringWholeDecimals: string;
  numberWholeDecimals: number;
  decimalSeparator: string;

  polyfunctionalStakeCoupon: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();



  // polifunctional stake preset from player
  polyfunctionStakePresetPlayer: PolyfunctionStakePresetPlayer;
  polyfunctionStakePresetPlayerSub: Subject<PolyfunctionStakePresetPlayer>;
  polyfunctionStakePresetPlayerObs: Observable<PolyfunctionStakePresetPlayer>;

  // coupon placement
  couponHasBeenPlacedSubscription: Subscription;

  constructor(
    private setting: AppSettings,
    public productService: ProductsService,
    private translate: TranslateUtilityService,
    private userService: UserService,
    private couponService: CouponService
    ) {
      // Listen to the coupon placement and reset the player's preset stake
      this.couponHasBeenPlacedSubscription =  couponService.couponHasBeenPlacedObs.subscribe( () => {
        this.settingStakePresetPlayer();
      });


    this.polyfunctionalDecimalsFlag = true;
    this.polyfunctionalAdditionFlag = true;
    // manages data display: amount addition/decimals and amount distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        // check if the odds is changed and reset the tap of preset stake
        if (this.polyfunctionalArea && this.polyfunctionalArea.odds.length !== element.odds.length ) {
          this.polyfunctionStakePresetPlayer.firstTap = true;
        }
        this.polyfunctionalArea = element;

        if (this.polyfunctionalArea) {
          if (this.polyfunctionalArea.odds !== undefined) {
            this.polyfunctionalArea.activeDistributionTot = true;
            this.polyfunctionalArea.activeAssociationCol = true;
          } else {
            this.polyfunctionalArea.activeDistributionTot = false;
            this.polyfunctionalArea.activeAssociationCol = true;
          }
          // update type Betslip on change distribution amount for COL or TOT
          if (
            this.polyfunctionalArea.typeSlipCol === TypeBetSlipColTot.TOT &&
            this.polyfunctionalArea.odds !== undefined
          ) {
            this.polyfunctionalArea.odds.map(item => {
              item.amount =
                this.polyfunctionalArea.amount /
                this.polyfunctionalArea.odds.length;
            });
          } else if (this.polyfunctionalArea.odds !== undefined) {
            this.polyfunctionalArea.odds.map(item => {
              item.amount = this.polyfunctionalArea.amount;
            });
          }
        }
      }
    );

    this.productService.polyfunctionalStakeCouponObs.subscribe(
      elem => {
        this.polyfunctionalStakeCoupon = elem;
      }
    );

    // stake preset from player insert
    this.polyfunctionStakePresetPlayerSub = new Subject<PolyfunctionStakePresetPlayer>();
    this.polyfunctionStakePresetPlayerObs = this.polyfunctionStakePresetPlayerSub.asObservable();
    // setup the default values
    this.checkSeparator();
    this.settingStakePresetPlayer();
  }

  ngOnDestroy(): void {
    this.couponHasBeenPlacedSubscription.unsubscribe();
    this.polyfunctionalValueSubscribe.unsubscribe();
  }

  /**
   *
   */
  tapPlus(): void {
    this.assignStake();
    if (this.userService.isModalOpen) {
      this.userService.isBtnCalcEditable = false;
    }
    if (this.couponService.oddStakeEdit) {
      this.couponService.updateCoupon();
      return;
    }
    if (this.polyfunctionalStakeCoupon.isEnabled) {
      this.updateCouponStake();
      return;
    }
    if (!this.polyfunctionalArea || !this.polyfunctionalArea.odds) {
      return;
    }
    // Check if the "shortcut method" is available for the selection
    if (this.polyfunctionalArea.shortcut) {
      this.couponService.addRemoveToCouponSC(this.polyfunctionalArea);
    } else {
      this.couponService.addRemoveToCoupon(this.polyfunctionalArea.odds, this.productService.product.typeCoupon.acceptMultiStake);
    }

    this.productService.closeProductDialog();
    this.productService.resetBoard();
  }


  // updated global amount to coupon
  private updateCouponStake(): void {
    if (
      this.couponService.coupon &&
      this.polyfunctionalStakeCoupon.isEnabled
    ) {
      this.couponService.coupon.Odds.forEach(item => {
        item.OddStake = this.polyfunctionalStakeCoupon.columnAmount;
      });
      this.couponService.updateCoupon();
      this.clearAll();
    }
  }

  /**
   *
   */
  public clearAll(): void {
    this.productService.closeProductDialog();
    this.productService.resetBoard();

    if (this.polyfunctionalArea) {
      this.polyfunctionalArea.amount = 1;
    }
    this.polyfunctionalAdditionFlag = true;
    this.polyfunctionalDecimalsFlag = true;

    /*
    // reset the input preset amount
    this.btncalcService.settingStakePresetPlayer(); */
    /* this.amountSetToPolyfunctionalStakeCoupon(); */
    this.productService.polyfunctionalStakeCouponSubject.next(
      new PolyfunctionalStakeCoupon()
    );
  }

  /**
   *
   */
  checkSeparator(): void {
    // it is used on the DOM and it is put on the CALC BUTTON
    if (this.userService.userDetail && !this.decimalSeparator) {
      const decimalCheck = 1.2;
      const separator = decimalCheck.toLocaleString( this.translate.getCurrentLanguage() ).substring(1, 2);
      // tslint:disable-next-line:max-line-length
      const currencyHasDecimal = Number(formatCurrency(decimalCheck, this.translate.getCurrentLanguage(), '', this.userService.userCurrency ));
      if ( !Number.isInteger(currencyHasDecimal) ) {
        this.decimalSeparator  = separator;
      }
    } else {
      timer(1000).subscribe( () => this.checkSeparator() );
    }
  }

  // default presets player
  settingStakePresetPlayer(): void {
    if (this.setting.defaultAmount.PresetOne !== null ) {
      this.polyfunctionStakePresetPlayer = new PolyfunctionStakePresetPlayer(
        TypeBetSlipColTot.COL,
        this.setting.defaultAmount.PresetOne
      );
      this.polyfunctionStakePresetPlayerSub.next(this.polyfunctionStakePresetPlayer);
    } else {
      timer(1000).subscribe( () => this.settingStakePresetPlayer() );
    }
  }


  // TOT & COL buttons on/off
  btnTotColSelection(betTotColSelected: TypeBetSlipColTot): void {
    if (this.polyfunctionalArea) {
      this.polyfunctionalArea.typeSlipCol = betTotColSelected;
      this.productService.polyfunctionalAreaSubject.next(this.polyfunctionalArea);
      // preset player selected
      this.polyfunctionStakePresetPlayer.typeSlipCol = betTotColSelected;
      this.polyfunctionStakePresetPlayerSub.next(this.polyfunctionStakePresetPlayer);
    }
  }

  /**
   * Keep in mind that the "setDecimalSeparator" variables are enabled
   * when the user tapes the specific symbol on the calculator.
   * If setDecimalSeparator is true the referer real amount is "amountStr's" value, viceversa it is "amount" value.
   * All variables are in the  "PolyfunctionalArea" Object.
   * @param amount
   * @param typingType
   */
  public returnTempNumberToPolyfuncArea(amount: number, typingType: TYPINGTYPE): number {
    // check if hasDecimalSeparator
    // tslint:disable-next-line:max-line-length
    let tempAmount = (this.polyfunctionStakePresetPlayer.hasDecimalSeparator) ? this.polyfunctionStakePresetPlayer.amountStr  : this.polyfunctionStakePresetPlayer.amount;

    if (this.polyfunctionStakePresetPlayer.typingType !== typingType) {
      this.polyfunctionStakePresetPlayer.firstTap = true;
      this.polyfunctionStakePresetPlayer.typingType = typingType;
      this.polyfunctionStakePresetPlayer.hasDecimalSeparator = false;
      this.polyfunctionStakePresetPlayer.disableInputCalculator = false;
    }

    // check if it is the first time that the player taps the button on calculator.
    if (!this.polyfunctionStakePresetPlayer.firstTap && this.polyfunctionStakePresetPlayer.typingType === TYPINGTYPE.BY_KEYBOARD) {
      tempAmount +=  amount.toString();
    } else if (!this.polyfunctionStakePresetPlayer.firstTap && this.polyfunctionStakePresetPlayer.typingType === TYPINGTYPE.BY_PRESET) {
      tempAmount = Number(tempAmount) + amount;
    } else {
      tempAmount  = amount.toString();
      // set to false "firstTap", so Following  append to current amount value
      this.polyfunctionStakePresetPlayer.firstTap = false;
    }
    this.polyfunctionStakePresetPlayer.amountStr = tempAmount.toString();
    if (
      this.polyfunctionStakePresetPlayer.hasDecimalSeparator &&
      this.polyfunctionStakePresetPlayer.amountStr.split('.')[1].length === 2
    ) {
      this.polyfunctionStakePresetPlayer.disableInputCalculator = true;
    }
    return parseFloat(tempAmount.toString());
  }

  public setAmountToOdd(amount: number, oddStake: OddsStakeEdit): void {
    // check if hasDecimalSeparator
    let tempAmount = oddStake.tempStakeStr;
    // check if it is the first time that the player taps the button on calculator.
    if (oddStake.hasDecimalSeparator && oddStake.tempStakeStr.split('.')[1].length === 2) {
      return;
    }

    if (Number(tempAmount) > 0 || oddStake.hasDecimalSeparator) {
      tempAmount +=  amount.toString();
    } else {
      tempAmount  = amount.toString();
    }
    oddStake.tempStakeStr = tempAmount;
    oddStake.tempStake =  parseFloat(tempAmount.toString());
  }

  /**
   *
   */
  public setDecimal(): void {
    if (this.couponService.oddStakeEdit && !this.couponService.oddStakeEdit.hasDecimalSeparator) {
      this.couponService.oddStakeEdit.tempStakeStr += '.';
      this.couponService.oddStakeEdit.hasDecimalSeparator = true;
    }
    if (!this.polyfunctionStakePresetPlayer.hasDecimalSeparator ) {
      this.polyfunctionStakePresetPlayer.hasDecimalSeparator = true;
      this.polyfunctionStakePresetPlayer.amountStr += '.';
    }
  }

  /**
   * assign Stake To Coupon Or stake in PolyfuncionalArea
   */
  public assignStake(): void {
    // check if there is a selection in polyfuncional Area and associate the amount if there is no selection,
    // check for coupon and associate the amount
    if (this.polyfunctionalArea.odds.length > 0 && this.productService.product.typeCoupon.acceptMultiStake) {
      this.polyfunctionalArea.amount = this.polyfunctionStakePresetPlayer.amount;
      this.productService.polyfunctionalAreaSubject.next(
        this.polyfunctionalArea
      );
    } else if (
      this.polyfunctionalArea.odds.length === 0 &&
      this.couponService.coupon &&
      this.productService.product.typeCoupon.acceptMultiStake
    ) {
      const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
      if ( this.polyfunctionStakePresetPlayer.typeSlipCol === TypeBetSlipColTot.COL ) {
        amountTemp.totalAmount = this.polyfunctionStakePresetPlayer.amount * this.couponService.coupon.Odds.length;
        amountTemp.columnAmount = this.polyfunctionStakePresetPlayer.amount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.COL;
      } else {
        amountTemp.columnAmount = this.polyfunctionStakePresetPlayer.amount / this.couponService.coupon.Odds.length;
        amountTemp.totalAmount = this.polyfunctionStakePresetPlayer.amount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.TOT;
      }
      amountTemp.isEnabled = true;
      amountTemp.columns = this.couponService.coupon.Odds.length;
      amountTemp.digitAmount = this.polyfunctionStakePresetPlayer.amount;
      this.productService.polyfunctionalStakeCouponSubject.next(amountTemp);
      this.polyfunctionStakePresetPlayer.isPreset = false;
    } else if (
      this.polyfunctionalArea.odds.length === 0 &&
      this.couponService.coupon &&
      !this.productService.product.typeCoupon.acceptMultiStake
    ) {
      const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
      // number's combinations played
      let groupNumberCombinations: number = 0;
      const groupIndexSelected: number[] =  [];
      this.couponService.coupon.Groupings.forEach( (group, idx) => {
        if (group.Selected) {
          groupNumberCombinations += group.Combinations;
          groupIndexSelected.push(idx);
        }
      });

      if ( this.polyfunctionStakePresetPlayer.typeSlipCol === TypeBetSlipColTot.COL ) {
        amountTemp.totalAmount = this.polyfunctionStakePresetPlayer.amount * groupNumberCombinations;
        amountTemp.columnAmount = this.polyfunctionStakePresetPlayer.amount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.COL;
      } else {
        amountTemp.columnAmount = this.polyfunctionStakePresetPlayer.amount / groupNumberCombinations;
        amountTemp.totalAmount = this.polyfunctionStakePresetPlayer.amount;
        amountTemp.typeSlipCol = TypeBetSlipColTot.TOT;
      }

      for(const i of groupIndexSelected) {
        this.couponService.coupon.Groupings[i].Stake =  amountTemp.columnAmount;
      }

      amountTemp.isEnabled = true;
      amountTemp.columns = groupNumberCombinations;
      amountTemp.digitAmount = this.polyfunctionStakePresetPlayer.amount;
      this.productService.polyfunctionalStakeCouponSubject.next(amountTemp);
      this.polyfunctionStakePresetPlayer.isPreset = false;
    }


    if (!this.polyfunctionStakePresetPlayer.isPreset) {
      this.settingStakePresetPlayer();
    }
  }
}
