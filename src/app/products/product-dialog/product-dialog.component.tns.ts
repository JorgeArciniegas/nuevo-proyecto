import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { DialogService } from '../dialog.service';
import { BetOdd, DialogData } from '../products.model';
import { ProductsService } from '../products.service';
import { CouponService } from '../../component/coupon/coupon.service';
import { BetCouponOddExtended } from '@elys/elys-coupon';
import { BetCouponOdd } from '@elys/elys-api';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  @Input()
  private data: DialogData;

  public settings: AppSettings;
  private rowNumber = 3;
  public columnNumber = 3;
  private maxItems = 0;
  public page = 0;
  public maxPage = 0;
  public columns = '';
  public rows = '';
  public title: string;
  public betOdds: BetOdd[];
  public betCouponOdd: BetCouponOddExtended[];
  public emptyOdds: string[] = [];

  constructor(
    private dialog: DialogService,
    private productService: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService
  ) {
    this.settings = appSettings;
    if (this.productService.windowSize && this.productService.windowSize.small) {
      this.rowNumber = 2;
    }

    this.couponService.couponResponse.subscribe(coupon => { this.data.betCoupon = coupon; this.filterOddsToCoupon(); });
  }

  ngOnInit(): void {
    this.title = this.data.title;
    for (let index = 0; index < this.columnNumber - 1; index++) {
      this.columns += ',*';
    }
    for (let index = 0; index < this.rowNumber; index++) {
      this.rows += ',5*';
    }
    this.maxItems = this.rowNumber * this.columnNumber;
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

  close(): void {
    this.couponService.oddStakeEditSubject.next(null);
    this.dialog.showDialog = false;
  }

  removeOdd(odd: BetCouponOddExtended): void {
    const betOdd: BetOdd = new BetOdd(odd.SelectionName, odd.OddValue, odd.OddStake, odd.SelectionId);
    this.couponService.addRemoveToCoupon([betOdd]);
  }

  // change stake from odd's coupon
  checkOddToChangeStake(odd: BetCouponOdd): void {
    this.couponService.checkOddToChangeStake(odd);
  }
}
