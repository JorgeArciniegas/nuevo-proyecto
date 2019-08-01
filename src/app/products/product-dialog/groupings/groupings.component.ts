import { Component, Input, OnInit } from '@angular/core';
import { BetCouponGroup } from '@elys/elys-api';
import { AppSettings } from 'src/app/app.settings';
import { CouponService } from 'src/app/component/coupon/coupon.service';
import { UserService } from 'src/app/services/user.service';
import {
  BetDataDialog,
  PolyfunctionStakePresetPlayer
} from '../../products.model';
import { BtncalcService } from 'src/app/component/btncalc/btncalc.service';
import { TypeBetSlipColTot } from '../../main/main.models';

@Component({
  selector: 'app-groupings',
  templateUrl: './groupings.component.html',
  styleUrls: ['./groupings.component.scss']
})
export class GroupingsComponent implements OnInit {
  @Input()
  data: BetDataDialog;
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

  groupings: BetCouponGroup[];
  emptyGroupings: string[] = [];
  amountPresetPlayer: PolyfunctionStakePresetPlayer;
  constructor(
    public userService: UserService,
    public readonly settings: AppSettings,
    public readonly couponService: CouponService,
    private btnService: BtncalcService
  ) {
    this.amountPresetPlayer = this.btnService.polyfunctionStakePresetPlayer;
  }

  ngOnInit() {
    this.maxItems = this.rowNumber * this.column;
    this.maxPage = Math.ceil(this.data.groupings.length / this.maxItems);
    this.filterGroupings();
  }

  filterGroupings() {
    try {
      const start = this.page * this.maxItems;
      let end = (this.page + 1) * this.maxItems;
      if (end > this.data.groupings.length) {
        end = this.data.groupings.length;
      }
      this.groupings = this.data.groupings.slice(start, end);

      if (this.page === this.maxPage - 1) {
        for (
          let index = 0;
          index < this.maxItems - this.groupings.length;
          index++
        ) {
          this.emptyGroupings.push('');
        }
      } else {
        this.emptyGroupings = [];
      }
    } catch (err) {}
  }

  previusOdds() {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    this.filterGroupings();
  }

  nextOdds() {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    this.filterGroupings();
  }

  checkedGrouping($event, grouping: BetCouponGroup): void {
    if ($event.checked) {
      grouping.Selected = true;
      grouping.Stake =
        this.amountPresetPlayer.typeSlipCol === TypeBetSlipColTot.TOT
          ? this.amountPresetPlayer.amount / grouping.Combinations
          : this.amountPresetPlayer.amount;
    } else {
      grouping.Selected = false;
      grouping.Stake = 0;
    }
    this.couponService.calculateAmounts();
  }

  changeStakeToGrouping(grouping: BetCouponGroup): void {
    try {
      const tmpAmount = grouping.Stake;
      this.userService.isBtnCalcEditable = true;
      if (
        this.couponService.oddStakeEdit &&
        this.couponService.oddStakeEdit.grouping.Grouping === grouping.Grouping
      ) {
        this.userService.isBtnCalcEditable = false;
        if (grouping.Stake === 0 ) {
          grouping.Stake = tmpAmount;
        }
      }
      grouping.Stake = 0;
      this.couponService.checkGroupingToChangeStake(grouping);
    } catch (err) {
      console.log('Error', err);
    }
  }
}
