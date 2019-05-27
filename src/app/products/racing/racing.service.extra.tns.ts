import { DestroyCouponService } from '../../component/coupon/confirm-destroy-coupon/destroy-coupon.service.tns';
import { CouponService } from '../../component/coupon/coupon.service';
import { Subject, Observable } from 'rxjs';


export class RacingServiceExtra {

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

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
  changeRaceSelecting(selected: number) {

    // check if the coupon is initialize
    this.coupon.checkHasCoupon();
    // if the coupon isn't empty
    if (this.coupon.productHasCoupon.checked ) {
      // open modal destory confirm coupon
      this.destroyCouponService.openDestroyCouponDialog();
      this.destroyCouponService.showDialog = true;
      this.coupon.productHasCoupon.isRacing = true;
      this.coupon.productHasCoupon.racingNumber = selected;
      // subscribe to event dialog
    /*   this.destroyCouponService.dialogRef.afterClosed().subscribe( elem => {
        if (elem) {
          this.currentRaceSubscribe.next(selected);
        }
      }); */
    } else { // to contiue
      this.currentRaceSubscribe.next(selected);
    }

  }}
