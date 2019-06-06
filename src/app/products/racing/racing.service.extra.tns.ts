import { DestroyCouponService } from '../../component/coupon/confirm-destroy-coupon/destroy-coupon.service.tns';
import { CouponService } from '../../component/coupon/coupon.service';
import { Subject, Observable } from 'rxjs';
import { RaceDetail } from './racing.models';


export class RacingServiceExtra {

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;
  public raceDetails: RaceDetail;

  constructor(
    public coupon: CouponService,
    public destroyCouponService: DestroyCouponService

    ) {

      this.destroyCouponService.confirmDestroyObs.subscribe( elem => {
        this.destroyCouponService.showDialog = false;
        if ( elem && this.coupon.productHasCoupon.isRacing ) {
          this.currentRaceSubscribe.next(this.coupon.productHasCoupon.racingNumber);
          this.coupon.resetProductHasCoupon();
        }
      });

    }


  /**
  * Method to fire the current race number change.
  * If there is a coupon, it will be asked to delete it.
  * Otherwise, if there isn't, execute the change.
  * @param selected number of race
  *
  * */
  fireCurrentRaceChange(selected: number) {

    // check if the coupon is initialized
    this.coupon.checkHasCoupon();
    // if the coupon isn't empty
    if (this.coupon.productHasCoupon.checked && this.raceDetails.currentRace === selected ) {
      // open modal destroy confirm coupon
      this.destroyCouponService.openDestroyCouponDialog();
      this.destroyCouponService.showDialog = true;
      this.coupon.productHasCoupon.isRacing = true;
      this.coupon.productHasCoupon.racingNumber = selected;
    } else { // to continue
      this.currentRaceSubscribe.next(selected);
    }

  }}
