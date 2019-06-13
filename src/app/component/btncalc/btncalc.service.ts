import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UserService } from '../../../../src/app/services/user.service';
import { TranslateUtilityService } from '../../../../src/app/services/utility/translate-utility.service';
import { PolyfunctionalArea, PolyfunctionalStakeCoupon, PolyfunctionStakePresetPlayer } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { TypeBetSlipColTot } from '../../products/racing/racing.models';
import { formatCurrency } from '@angular/common';
import { AppSettings } from 'src/app/app.settings';
import { CouponService } from '../coupon/coupon.service';

@Injectable({
  providedIn: 'root'
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
  polyfunctionStakePresetPlayer: PolyfunctionStakePresetPlayer;

  constructor(
    private setting: AppSettings,
    public productService: ProductsService,
    private translate: TranslateUtilityService,
    private userService: UserService,
    private couponService: CouponService
    ) {


    this.polyfunctionalDecimalsFlag = true;
    this.polyfunctionalAdditionFlag = true;
    // manages data display: amount addition/decimals and amount distribution
    this.polyfunctionalValueSubscribe = this.productService.polyfunctionalAreaObservable.subscribe(
      element => {
        // check if the odds is changed and reset the tap of preset stake
        if (this.polyfunctionalArea.odds.length !== element.odds.length ) {
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

    // Separator decimal calculate
    this.checkSeparator();
    this.settingStakePresetPlayer();

  }

  ngOnDestroy(): void {
    this.polyfunctionalValueSubscribe.unsubscribe();
  }

  // default presets player
  settingStakePresetPlayer(): void {
    if (this.userService.userDetail) {
      this.polyfunctionStakePresetPlayer = new PolyfunctionStakePresetPlayer(
        TypeBetSlipColTot.COL,
        this.setting.defaultAmount.PresetOne
      );
      this.productService.polyfunctionStakePresetPlayerSub.next(this.polyfunctionStakePresetPlayer);
    } else  {
      timer(1000).subscribe( () => this.settingStakePresetPlayer() );
    }
  }

  checkSeparator(): void {
    // it is used on the DOM and it is put on the CALC BUTTON
    if (this.userService.userDetail && !this.decimalSeparator) {
      const decimalCheck = 1.2;
      const separator = decimalCheck.toLocaleString( this.translate.getCurrentLanguage() ).substring(1, 2);
      // tslint:disable-next-line:max-line-length
      const currencyHasDecimal = Number(formatCurrency(decimalCheck, this.translate.getCurrentLanguage(), '', this.userService.userDetail.Currency ));
      if ( !Number.isInteger(currencyHasDecimal) ) {
        this.decimalSeparator  = separator;
      }
    } else {
      timer(1000).subscribe( () => this.checkSeparator() );
    }
  }

  // increments amount in display by preset default bottons values
  btnDefaultAmountAddition(amount: number): void {
    this.polyfunctionalDecimalsFlag = true; // resets decimals to 0
    // if bet present in display...
    if (this.polyfunctionalArea) {
      // if bet displayed for the first time.....
      if (this.polyfunctionalAdditionFlag) {
        this.polyfunctionalArea.amount = 0; // resets amount to 0
        // if preset button value 1 and amount 0, pre-add 1 to increment sum
        if (amount === 1) {
          this.polyfunctionalArea.amount =
            this.polyfunctionalArea.amount + amount;
        }
        // resets flag to stop reseting amount to 0
        this.polyfunctionalAdditionFlag = false;
      }

      // increments amount by preset key values
      this.polyfunctionalArea.amount = this.polyfunctionalArea.amount + amount;
      this.productService.polyfunctionalAreaSubject.next(
        this.polyfunctionalArea
      );
      // this.selectedAmountSubject.next(this.polyfunctionalValue.amount);
    }
  }

  btnAmountDecimals(amount: number): void {
    this.polyfunctionalAdditionFlag = true; // resets addition to 0
    // if bet present in display...
    if (this.polyfunctionalArea) {
      // if bet displayed for the first time.....
      if (this.polyfunctionalDecimalsFlag) {
        this.polyfunctionalArea.amount = 0; // resets amount to 0
        this.stringWholeDecimals = ''; // sets decimals string
        this.polyfunctionalDecimalsFlag = false; // resets flag
      }

      /*
       * converts amount to string, concatenates to accumalated decimal string
       * converts accumulated decimal string back to number
       * algorithm to covert last two digits of number to decimals
       * assigns it back to amount
       */

      this.polyfunctionalArea.amount = this.returnNumberToPolyfuncArea(amount);
      if ( this.polyfunctionalArea.hasDecimalSeparator &&
          this.polyfunctionalArea.amountStr.split('.')[1].length === 2 ) {
        this.polyfunctionalArea.disableInputCalculator = true;
      }

    } else  {

      this.polyfunctionalArea = new PolyfunctionalArea();
      this.polyfunctionalDecimalsFlag = false;
      // this.polyfunctionalArea.firstTap = false;
      this.polyfunctionalArea.amount =  amount;
      this.polyfunctionalArea.amountStr = amount.toString();
    }

    // console.log(this.polyfunctionalArea);
    this.productService.polyfunctionalAreaSubject.next(
      this.polyfunctionalArea
    );
  }


  // TOT & COL buttons on/off
  btnTotColSelection(betTotColSelected: TypeBetSlipColTot): void {
    if (this.polyfunctionalArea) {
      this.polyfunctionalArea.typeSlipCol = betTotColSelected;
      this.productService.polyfunctionalAreaSubject.next(this.polyfunctionalArea);

      // preset player selected
      this.polyfunctionStakePresetPlayer.typeSlipCol = betTotColSelected;
      this.productService.polyfunctionStakePresetPlayerSub.next(this.polyfunctionStakePresetPlayer);
    }

  }

  /**
   * Keep in mind that the "setDecimalSeparator" variables are enabled
   * when the user tapes the specific symbol on the calculator.
   * If setDecimalSeparator is true the referer real amount is "amountStr's" value, viceversa it is "amount" value.
   * All variables are in the  "PolyfunctionalArea" Object.
   * @param amount
   */

  public returnTempNumberToPolyfuncArea(amount: number): number {

    // check if hasDecimalSeparator
    // tslint:disable-next-line:max-line-length
    let tempAmount = (this.polyfunctionStakePresetPlayer.hasDecimalSeparator) ? this.polyfunctionStakePresetPlayer.amountStr  : this.polyfunctionStakePresetPlayer.amount;

    // check if it is the first time that the player taps the button on calculator.
    if (!this.polyfunctionStakePresetPlayer.firstTap) {
      tempAmount +=  amount.toString();
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
    // ????????? DA RIVEDERE
    return parseFloat(tempAmount.toString());
  }



  public returnNumberToPolyfuncArea(amount: number): number {

    // check if hasDecimalSeparator
    let tempAmount = (this.polyfunctionalArea.hasDecimalSeparator) ? this.polyfunctionalArea.amountStr  : this.polyfunctionalArea.amount;

    // check if it is the first time that the player taps the button on calculator.
    if (!this.polyfunctionalArea.firstTap) {
      tempAmount +=  amount.toString();
    } else {
      tempAmount  = amount.toString();
      // set to false "firstTap", so Following  append to current amount value
      this.polyfunctionalArea.firstTap = false;
    }
    this.polyfunctionalArea.amountStr = tempAmount.toString();
    // ????????? DA RIVEDERE
    return parseFloat(tempAmount.toString());
  }

  /**
   *
   */
  public setDecimal(): void {
    /* if (!this.polyfunctionalArea.hasDecimalSeparator) {
      this.polyfunctionalArea.hasDecimalSeparator = true;
      this.polyfunctionalArea.amountStr += '.';
    } */

    if (!this.polyfunctionStakePresetPlayer.hasDecimalSeparator) {
      this.polyfunctionStakePresetPlayer.hasDecimalSeparator = true;
      this.polyfunctionStakePresetPlayer.amountStr += '.';
    }
  }


  btnAmountDecimalsChangeOddFnPOS(amount: number, oddStake: number): number {
    const tmpNumberLength = (oddStake * 100).toFixed()
    .toString()
    .replace('.', '');
    const stringTmpNumber = tmpNumberLength.toString() + amount.toString();
    return Number(stringTmpNumber) / 100;
  }


  /**
   * @deprecated
   * @param amount
   */
  private returnNumberToPolyfuncAreaFnPos(amount: number): number {
    const tmpNumberLength = (this.polyfunctionalArea.amount * 100)
      .toFixed()
      .toString()
      .replace('.', '');
    const stringTmpNumber = tmpNumberLength.toString() + amount.toString();
    return Number(stringTmpNumber) / 100;
  }

  /**
   * assign Stake To Coupon Or stake in PolyfuncionalArea
   */
  public assignStake(): void {
    // controllare se esiste una selezione in polyfuncional Area e ne associo l'importo
    // se non esiste nessuna selezione, verifica presenza coupon e ne associo l'importo
    if (this.polyfunctionalArea.odds.length > 0 ) {
      this.polyfunctionalArea.amount = this.polyfunctionStakePresetPlayer.amount;
      this.productService.polyfunctionalAreaSubject.next(
        this.polyfunctionalArea
      );
    } else if ( this.polyfunctionalArea.odds.length === 0 && this.couponService.coupon) {
      const amountTemp: PolyfunctionalStakeCoupon = new PolyfunctionalStakeCoupon();
      if (this.polyfunctionStakePresetPlayer.typeSlipCol === TypeBetSlipColTot.COL) {
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
    }


    if (!this.polyfunctionStakePresetPlayer.isPreset) {
      this.settingStakePresetPlayer();
    }
    //
  }
}
