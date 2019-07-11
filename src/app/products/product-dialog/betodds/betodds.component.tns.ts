import { Component, Input, OnInit } from '@angular/core';
import { BetCouponOdd } from '@elys/elys-api';
import { BetCouponOddExtended } from '@elys/elys-coupon';
import { AppSettings } from '../../../app.settings';
import { CouponService } from '../../../component/coupon/coupon.service';
import { DialogService } from '../../dialog.service';
import { BetOdd, DialogData } from '../../products.model';
import { ProductsService } from '../../products.service';
import { UserService } from '../../../../../src/app/services/user.service';

@Component({
  selector: 'app-betodds',
  templateUrl: './betodds.component.tns.html',
  styleUrls: ['./betodds.component.tns.scss']
})
export class BetoddsComponent implements OnInit {
  private rowNumber = 3;
  public columnNumber = 3;

  public settings: AppSettings;
  @Input()
  private data: DialogData;
  @Input()
  public page = 0;
  @Input()
  public maxPage = 0;
  public columns = '';
  public rows = '';
  @Input()
  private maxItems = 0;
  public betOdds: BetOdd[];

  public emptyOdds: string[] = [];

  public betCouponOdd: BetCouponOddExtended[];

  constructor(
    private dialog: DialogService,
    private productService: ProductsService,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService,
    public userService: UserService
  ) {
    this.settings = appSettings;
    if (
      this.productService.windowSize &&
      this.productService.windowSize.small
    ) {
      this.rowNumber = 2;
    }

    this.couponService.couponResponse.subscribe(coupon => {
      this.data.betCoupon = coupon;
      if (coupon) {
        this.filterOddsToCoupon();
      }
    });
  }

  ngOnInit(): void {
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

  /**
   * @deprecated
   * @param odd
   */
  toggleOdd(odd: BetOdd) {
    odd.selected = !odd.selected;
  }

  close(): void {
    this.couponService.oddStakeEditSubject.next(null);
    this.dialog.showDialog = false;
    this.userService.isBtnCalcEditable = true;
    this.userService.isModalOpen = false;
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
}
