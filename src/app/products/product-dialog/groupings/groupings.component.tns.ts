import { Component, Input, OnInit } from '@angular/core';
import { BetCouponGroup } from '@elys/elys-api';
import { BtncalcService } from '../../../component/btncalc/btncalc.service';
import { CouponService } from '../../../component/coupon/coupon.service';
import { UserService } from '../../../services/user.service';
import { WindowSizeService } from '../../../services/utility/window-size/window-size.service';
import { DialogService } from '../../dialog.service';
import { TypeBetSlipColTot } from '../../main/main.models';
import { DialogData, PolyfunctionStakePresetPlayer } from '../../products.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-groupings',
  templateUrl: './groupings.component.tns.html',
  styleUrls: ['./groupings.component.tns.scss']
})
export class GroupingsComponent implements OnInit {
  private rowNumber = 3;
  public columnNumber = 3;

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

  groupings: BetCouponGroup[];
  emptyGroupings: string[] = [];
  amountPresetPlayer: PolyfunctionStakePresetPlayer;
  constructor(
    public userService: UserService,
    public readonly couponService: CouponService,
    private btnService: BtncalcService,
    public productService: ProductsService,
    private dialog: DialogService,
    public windowSizeService: WindowSizeService
  ) {
    this.amountPresetPlayer = this.btnService.polyfunctionStakePresetPlayer;
    this.couponService.couponResponse.subscribe(coupon => {
      this.data.groupings = coupon.Groupings;
      if (coupon) {
        this.filterGroupings();
      }
    });
  }

  ngOnInit() {
    for (let index = 0; index < this.columnNumber - 1; index++) {
      this.columns += ',*';
    }
    for (let index = 0; index < this.rowNumber; index++) {
      this.rows += ',5*';
    }
    this.maxItems = this.rowNumber * this.columnNumber;
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
        for (let index = 0; index < this.maxItems - this.groupings.length; index++) {
          this.emptyGroupings.push('');
        }
      } else {
        this.emptyGroupings = [];
      }
    } catch (err) {
      console.log(err);
    }
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

  checkedGrouping(grouping: BetCouponGroup): void {
    if (!grouping.Selected) {
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
    this.couponService.updateCoupon();
  }

  changeStakeToGrouping(grouping: BetCouponGroup): void {
    try {
      const tmpAmount = grouping.Stake;
      this.userService.isBtnCalcEditable = true;
      if (this.couponService.oddStakeEdit && this.couponService.oddStakeEdit.grouping.Grouping === grouping.Grouping) {
        this.userService.isBtnCalcEditable = false;
        if (grouping.Stake === 0) {
          grouping.Stake = tmpAmount;
        }
      }
      grouping.Stake = 0;
      this.couponService.checkGroupingToChangeStake(grouping);
    } catch (err) {
      console.log('Error', err);
    }
  }

  close(): void {
    this.couponService.oddStakeEditSubject.next(null);
    this.dialog.showDialog = false;
    this.userService.isBtnCalcEditable = true;
    this.userService.isModalOpen = false;
  }
}
