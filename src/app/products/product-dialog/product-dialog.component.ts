import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable as ObservableIdle } from 'rxjs/Rx';
import { AppSettings } from '../../app.settings';
import { BetOdd, DialogData } from '../products.model';
import { BetCouponExtended, BetCouponOddExtended } from '@elys/elys-coupon/lib/elys-coupon.models';
import { CouponService } from '../../component/coupon/coupon.service';
import { BetCouponOdd } from '@elys/elys-api';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit, AfterViewInit {
  public settings: AppSettings;
  private rowNumber = 0;
  private maxItems = 0;
  public page = 0;
  public maxPage = 0;
  public containerPaddingTop: number;
  public column: number;
  public title: string;
  public betOdds: BetOdd[];
  public betCouponOdd: BetCouponOddExtended[];
  public emptyOdds: string[] = [];

  @ViewChild('content') elementView: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    public readonly appSettings: AppSettings,
    public readonly couponService: CouponService
  ) {
    this.settings = appSettings;
    this.title = data.title;
    if (data.breakpoint < 6) {
      this.column = 2;
    } else if (data.breakpoint === 6) {
      this.column = 3;
    } else {
      this.column = 4;
    }

    this.couponService.couponResponse.subscribe(coupon => { this.data.betCoupon = coupon; this.filterOddsToCoupon(); });
  }

  ngOnInit(): void {
    this.rowNumber = Math.floor(
      (this.elementView.nativeElement.offsetHeight - 60) / 105
    );
    this.containerPaddingTop = Math.floor(
      ((this.elementView.nativeElement.offsetHeight - 60) % 105) / 2
    );
    this.maxItems = this.rowNumber * this.column;
    if (this.data.betOdds) {
      this.maxPage = Math.ceil(this.data.betOdds.odds.length / this.maxItems);
      this.filterOdds();
    } else if (this.data.betCoupon) {
      this.maxPage = Math.ceil(this.data.betCoupon.Odds.length / this.maxItems);
      this.filterOddsToCoupon();
    }
  }

  ngAfterViewInit(): void {
    ObservableIdle.timer(150)
      .take(1)
      .subscribe(() => {
        this.data.opened = true;
      });
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
    this.dialogRef.close();
    this.couponService.oddStakeEditSubject.next(null);
    this.data.opened = false;
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
