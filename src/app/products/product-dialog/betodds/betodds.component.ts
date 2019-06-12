import { Component, Input, OnInit } from '@angular/core';
import { BetCouponOdd } from '@elys/elys-api';
import { BetCouponOddExtended } from '@elys/elys-coupon';
import { CouponService } from '../../../component/coupon/coupon.service';
import { BetDataDialog, BetOdd } from '../../products.model';
import { AppSettings } from '../../../../../src/app/app.settings';

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

  @Input()
  private data: BetDataDialog;

  constructor(
    public readonly couponService: CouponService,
    public readonly settings: AppSettings
  ) {
    this.couponService.couponResponse.subscribe(coupon => {
      this.data.betCoupon = coupon;
      this.filterOddsToCoupon();
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
  }

  // change stake from odd's coupon
  checkOddToChangeStake(odd: BetCouponOdd): void {
    this.couponService.checkOddToChangeStake(odd);
  }
}
