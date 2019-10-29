import { Component } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { MainService } from '../../../main.service';
import { KenoNumber } from '../../../playable-board/templates/keno/keno.model';
import { Lucky } from '../../lucky.model';
import { BtncalcService } from '../../../../../component/btncalc/btncalc.service';
import { CouponService } from '../../../../../component/coupon/coupon.service';

@Component({
  selector: 'app-lucky-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent {
  public lucky: typeof Lucky = Lucky;

  constructor(
    private mainService: MainService,
    public userService: UserService,
    private btncalcService: BtncalcService,
    private couponService: CouponService) { }

  public async placeLucky(lucky: Lucky): Promise<void> {
    // reset all odds selected
    this.couponService.resetCoupon();
    this.mainService.resetPlayEvent();
    const extractedNumbers: number[] = this.extractKenoNumbers(lucky);
    await this.processLuckyNumbersQueue(extractedNumbers);
  }

  private async processLuckyNumbersQueue(extractedNumbers: number[]): Promise<void> {
    while (extractedNumbers.length > 0) {
      const kenoNumber: KenoNumber = {
        number: extractedNumbers.pop(),
        isSelected: true
      };
      this.mainService.placingNumber(kenoNumber);
      let eventid;
      await this.mainService.getCurrentEvent().then(
        (item) => { eventid = item.mk[0].sls[0].id; });
      this.btncalcService.lotteryPushToCoupon(kenoNumber.number, eventid);
    }
  }

  private extractKenoNumbers(extractCounterIdx: number): number[] {
    const extractMatchesIdx: number[] = [];
    while (extractCounterIdx !== 0) {
      const extractNumber: number = Math.floor(Math.random() * 80) + 1;
      if (!extractMatchesIdx.includes(extractNumber)) {
        extractMatchesIdx.push(extractNumber);
        extractCounterIdx--;
      }
    }
    return extractMatchesIdx;
  }

}
