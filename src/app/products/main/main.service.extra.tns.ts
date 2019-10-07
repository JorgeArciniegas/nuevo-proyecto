import { DestroyCouponService } from '../../component/coupon/confirm-destroy-coupon/destroy-coupon.service.tns';
import { CouponService } from '../../component/coupon/coupon.service';
import { Subject, Observable } from 'rxjs';
import { EventDetail } from './main.models';

export class MainServiceExtra {
  public currentEventSubscribe: Subject<number>;
  public currentEventObserve: Observable<number>;
  public eventDetails: EventDetail;
  public toResetAllSelections: boolean;
  constructor(public couponService: CouponService, public destroyCouponService: DestroyCouponService) {
    this.destroyCouponService.confirmDestroyObs.subscribe(elem => {
      this.destroyCouponService.showDialog = false;
      if (elem && this.couponService.productHasCoupon.isRacing) {
        this.currentEventSubscribe.next(this.couponService.productHasCoupon.eventNumber);
        this.couponService.resetProductHasCoupon();
      }
    });
  }

  /**
   * Method to fire the current event number change.
   * If there is a coupon, it will be asked to delete it.
   * Otherwise, if there isn't, execute the change.
   * @param selected number of event
   * @param userSelect if the event number is change by user  or it is forward by system
   *
   * */
  fireCurrentEventChange(selected: number, userSelect = false) {
    // check if the coupon is initialized
    this.couponService.checkHasCoupon();
    // set to reset all variables
    this.toResetAllSelections = true;
    // if the coupon isn't empty
    if (
      this.couponService.productHasCoupon &&
      this.couponService.productHasCoupon.checked &&
      (this.eventDetails.currentEvent !== selected || userSelect) &&
      (this.couponService.coupon && this.couponService.coupon.Odds.length > 0)
    ) {
      // open modal destroy confirm coupon
      this.destroyCouponService.openDestroyCouponDialog();
      this.destroyCouponService.showDialog = true;
      this.couponService.productHasCoupon.isRacing = true;
      this.couponService.productHasCoupon.eventNumber = selected;
    } else {
      // to continue
      this.currentEventSubscribe.next(selected);
    }
  }
}
