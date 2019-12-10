import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { RouterService } from '../../../../services/utility/router/router.service';
import { CouponStatusInternal, CouponTypeInternal } from '../bets-list.model';
import { BetsListService } from '../bets-list.service';
import { WindowSizeService } from '../../../../services/utility/window-size/window-size.service';

@Component({
  selector: 'app-summary-coupons',
  templateUrl: './summary-coupons.component.html',
  styleUrls: ['./summary-coupons.component.scss']
})
export class SummaryCouponsComponent {
  couponType: typeof CouponTypeInternal = CouponTypeInternal;
  couponStatus: typeof CouponStatusInternal = CouponStatusInternal;
  viewSmall: boolean;
  constructor(
    public userService: UserService,
    public betsListService: BetsListService,
    private router: RouterService,
    private windowService: WindowSizeService) {
    this.viewSmall = (this.windowService.windowSize.height < 800) ? true : false;
  }

  goBack(): void {
    this.router.getBack();
  }

  showDetails(item: string) {
    this.router.getRouter().navigate(['admin/reports/betsList/detail', item]);
  }
}
