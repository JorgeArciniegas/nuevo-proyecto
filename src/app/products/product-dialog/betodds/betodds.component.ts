import { Component, Input, OnInit } from '@angular/core';
import { BetCouponOdd } from '@elys/elys-api';
import { BetCouponOddExtended } from '@elys/elys-coupon';
import { CouponService } from '../../../component/coupon/coupon.service';
import { BetDataDialog, BetOdd, Market } from '../../products.model';
import { AppSettings } from '../../../../../src/app/app.settings';
import { UserService } from '../../../../../src/app/services/user.service';
import { LAYOUT_TYPE } from '../../../../environments/environment.models';
import { AmericanRouletteRug } from '../../main/playable-board/templates/american-roulette/american-roulette.models';
import { Colour } from '../../main/playable-board/templates/colours/colours.models';

@Component({
  selector: 'app-betodds',
  templateUrl: './betodds.component.html',
  styleUrls: ['./betodds.component.scss']
})
export class BetoddsComponent implements OnInit {
  @Input()
  private rowNumber = 0;
  @Input()
  public page = 0;
  @Input()
  public maxPage = 0;
  @Input()
  public column: number;
  @Input()
  private maxItems = 0;
  public betOdds: BetOdd[];

  public emptyOdds: string[] = [];

  public betCouponOdd: BetCouponOddExtended[];

  // MultiStake
  multiStake: boolean;
  @Input()
  private data: BetDataDialog;
  // American roulette
  layout: LAYOUT_TYPE;
  layoutType: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  market: typeof Market = Market;

  constructor(
    public readonly couponService: CouponService,
    public readonly settings: AppSettings,
    public userService: UserService
  ) {
    this.multiStake = settings.products.filter(prod => prod.productSelected)[0].typeCoupon.acceptMultiStake;
    this.layout = settings.products.filter(prod => prod.productSelected)[0].typeCoupon.typeLayout;
    this.couponService.couponResponse.subscribe(coupon => {
      this.data.betCoupon = coupon;
      if (coupon) {
        this.filterOddsToCoupon();
      }
    });
  }

  ngOnInit() {
    this.maxItems = this.rowNumber * this.column;
    if (this.data.betOdds) {
      this.maxPage = Math.ceil(this.data.betOdds.odds.length / this.maxItems);
      this.filterOdds();
    } else if (this.data.betCoupon) {
      this.maxPage = Math.ceil(this.data.betCoupon.Odds.length / this.maxItems);
      this.filterOddsToCoupon();
    }
  }
  /**
   *
   */
  filterOdds() {
    const start = this.page * this.maxItems;
    let end = (this.page + 1) * this.maxItems;
    if (end > this.data.betOdds.odds.length) {
      end = this.data.betOdds.odds.length;
    }
    this.betOdds = this.data.betOdds.odds.slice(start, end);

    if (this.page === this.maxPage - 1) {
      for (
        let index = 0;
        index < this.maxItems - this.betOdds.length;
        index++
      ) {
        this.emptyOdds.push('');
      }
    } else {
      this.emptyOdds = [];
    }
  }

  filterOddsToCoupon() {
    const start = this.page * this.maxItems;
    let end = (this.page + 1) * this.maxItems;
    if (end > this.data.betCoupon.Odds.length) {
      end = this.data.betCoupon.Odds.length;
    }
    this.betCouponOdd = this.data.betCoupon.Odds.slice(start, end);
    this.emptyOdds = [];
    if (this.page === this.maxPage - 1) {
      for (
        let index = 0;
        index < this.maxItems - this.betCouponOdd.length;
        index++
      ) {
        this.emptyOdds.push('');
      }
    }
  }

  previusOdds() {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    if (this.betOdds) {
      this.filterOdds();
    } else {
      this.filterOddsToCoupon();
    }
  }

  nextOdds() {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    if (this.betOdds) {
      this.filterOdds();
    } else {
      this.filterOddsToCoupon();
    }
  }

  /**
   * @deprecated
   * @param odd
   */
  toggleOdd(odd: BetOdd) {
    odd.selected = !odd.selected;
  }

  removeOdd(odd: BetCouponOddExtended): void {
    const betOdd: BetOdd = new BetOdd(
      odd.SelectionName,
      odd.OddValue,
      odd.OddStake,
      odd.SelectionId
    );
    this.couponService.addRemoveToCoupon([betOdd]);
    this.userService.isBtnCalcEditable = false;
  }

  // change stake from odd's coupon
  checkOddToChangeStake(odd: BetCouponOdd): void {
    this.userService.isBtnCalcEditable = true;
    if (
      this.couponService.oddStakeEdit &&
      this.couponService.oddStakeEdit.odd.SelectionId === odd.SelectionId
    ) {
      this.userService.isBtnCalcEditable = false;
    }

    this.couponService.checkOddToChangeStake(odd);
  }


  // American Roulette
  getNumber(n: number): string {
    const americanRoulette: AmericanRouletteRug = new AmericanRouletteRug();
    if (americanRoulette.red.includes(parseInt(n.toString(), 10))) {
      return Colour[Colour.RED];
    } else if (americanRoulette.black.includes(parseInt(n.toString(), 10))) {
      return Colour[Colour.BLACK];
    } else {
      return Colour[Colour.GREEN];
    }
  }
}
