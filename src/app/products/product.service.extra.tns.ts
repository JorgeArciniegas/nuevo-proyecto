import { Observable, Subject } from 'rxjs';
import { Products } from '../../environments/environment.models';
import { DestroyCouponService } from '../component/coupon/confirm-destroy-coupon/destroy-coupon.service.tns';
import { CouponService } from '../component/coupon/coupon.service';
import { RouterService } from '../services/utility/router/router.service';
import { DialogService } from './dialog.service';
export class ProductsServiceExtra {

  public productNameSelectedSubscribe: Subject<string>;
  public productNameSelectedObserve: Observable<string>;

   // product selected
   product: Products;

  constructor(
    public couponInternalService: CouponService,
    public destroyCouponService: DestroyCouponService,
    public router: RouterService) {
      this.destroyCouponService.confirmDestroyObs.subscribe( elem => {
        this.destroyCouponService.showDialog = false;
        if ( elem && !this.couponInternalService.productHasCoupon.isRacing ) {
          this.destroyCouponConfirm();
        }
      });
    }

    /**
   *
   * @param codeProduct
   */
  changeProduct(codeProduct: string): void {

    // check if the productCode is equal and it isn't to mark destroy
    if (this.product && codeProduct === this.product.codeProduct) {
      this.router.getRouter().navigate(['/products/racing']);
    } else {
      // check if the product has a temporary coupon
      this.couponInternalService.checkHasCoupon();
      // opening the confirm destroy coupon process
      if (this.couponInternalService.productHasCoupon.checked ) {
          // update productCode request for checked on the other service
          this.couponInternalService.productHasCoupon.productCodeRequest = codeProduct;
          // open modal destory confirm coupon
          this.destroyCouponService.openDestroyCouponDialog();
          this.destroyCouponService.showDialog = true;
          this.couponInternalService.productHasCoupon.isRacing = false;
      } else { // the coupon is empty
        this.productNameSelectedSubscribe.next(codeProduct);
        this.router.getRouter().navigate(['/products/racing']);
      }
    }

  }


  destroyCouponConfirm(): void {
    this.productNameSelectedSubscribe.next(this.couponInternalService.productHasCoupon.productCodeRequest);
    this.router.getRouter().navigate(['/products/racing']);
    this.couponInternalService.resetProductHasCoupon();
  }

}
