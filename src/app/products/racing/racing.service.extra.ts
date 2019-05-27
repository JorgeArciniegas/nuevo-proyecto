import { DestroyCouponService } from '../../../../src/app/component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { CouponService } from '../../../../src/app/component/coupon/coupon.service';
import { Subject, Observable } from 'rxjs';


export class RacingServiceExtra {

  public currentRaceSubscribe: Subject<number>;
  public currentRaceObserve: Observable<number>;

  constructor(
    public coupon: CouponService,
    public destroyCouponService: DestroyCouponService

    ) {}
  changeRaceSelecting(selected: number) {

    // check if the coupon is initialize
    this.coupon.checkHasCoupon();
    // if the coupon isn't empty
    if (this.coupon.productHasCoupon.checked ) {
      // open modal destory confirm coupon
      this.destroyCouponService.openDestroyCouponDialog();
      // subscribe to event dialog
      this.destroyCouponService.dialogRef.afterClosed().subscribe( elem => {
        if (elem) {
          this.currentRaceSubscribe.next(selected);
        }
      });
    } else { // to contiue
      this.currentRaceSubscribe.next(selected);
    }

  }}
