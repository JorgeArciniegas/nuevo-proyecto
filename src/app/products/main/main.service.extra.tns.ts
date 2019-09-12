import { DestroyCouponService } from '../../component/coupon/confirm-destroy-coupon/destroy-coupon.service.tns';
import { CouponService } from '../../component/coupon/coupon.service';
import { Subject, Observable } from 'rxjs';
import { EventDetail } from './main.models';

export class MainServiceExtra {
  public currentEventSubscribe: Subject<number>;
  public currentEventObserve: Observable<number>;
  public eventDetails: EventDetail;
  public toResetAllSelections: boolean;
  constructor(public coupon: CouponService, public destroyCouponService: DestroyCouponService) {
    this.destroyCouponService.confirmDestroyObs.subscribe(elem => {
      this.destroyCouponService.showDialog = false;
      if (elem && this.coupon.productHasCoupon.isRacing) {
        this.currentEventSubscribe.next(this.coupon.productHasCoupon.eventNumber);
        this.coupon.resetProductHasCoupon();
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
    this.coupon.checkHasCoupon();
    // set to reset all variables
    this.toResetAllSelections = true;
    // if the coupon isn't empty
    if (this.coupon.productHasCoupon.checked && (this.eventDetails.currentEvent !== selected || userSelect)) {
      // open modal destroy confirm coupon
      this.destroyCouponService.openDestroyCouponDialog();
      this.destroyCouponService.showDialog = true;
      this.coupon.productHasCoupon.isRacing = true;
      this.coupon.productHasCoupon.eventNumber = selected;
    } else {
      // to continue
      this.currentEventSubscribe.next(selected);
    }
  }
}
