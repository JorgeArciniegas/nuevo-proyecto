import { DestroyCouponService } from '../../component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { CouponService } from '../../component/coupon/coupon.service';
import { Subject, Observable } from 'rxjs';
import { RaceDetail } from './main.models';


export class MainServiceExtra {

  public currentEventSubscribe: Subject<number>;
  public currentEventObserve: Observable<number>;
  public raceDetails: RaceDetail;

  constructor(
    public coupon: CouponService,
    public destroyCouponService: DestroyCouponService
    ) {}



  /**
  * Method to fire the current race number change.
  * If there is a coupon, it will be asked to delete it.
  * Otherwise, if there isn't, execute the change.
  * @param selected number of race
  * @param userSelect if the race number is change by user  or it is forward by system
  *
  * */
  fireCurrentRaceChange(selected: number, userSelect = false) {
    // check if the coupon is initialized
    this.coupon.checkHasCoupon();
    // if the coupon isn't empty
    if (this.coupon.productHasCoupon.checked && (this.raceDetails.currentRace !== selected || userSelect) ) {
      // open modal destroy confirm coupon
      this.destroyCouponService.openDestroyCouponDialog();
      // subscribe to event dialog
      this.destroyCouponService.dialogRef.afterClosed().subscribe( elem => {
        if (elem) {
          this.currentEventSubscribe.next(selected);
        }
      });
    } else { // to continue
      this.currentEventSubscribe.next(selected);
    }
  }
}
