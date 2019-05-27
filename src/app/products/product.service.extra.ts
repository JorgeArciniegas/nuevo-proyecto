import { Observable, Subject } from 'rxjs';
import { Products } from '../../environments/environment.models';
import { DestroyCouponService } from '../component/coupon/confirm-destroy-coupon/destroy-coupon.service';
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
          // subscribe to event dialog
          this.destroyCouponService.dialogRef.afterClosed().subscribe( elem => {
            if (elem) {
              this.productNameSelectedSubscribe.next(codeProduct);
              this.router.getRouter().navigate(['/products/racing']);
            }
          });
      } else { // the coupon is empty
        this.productNameSelectedSubscribe.next(codeProduct);
        this.router.getRouter().navigate(['/products/racing']);
      }
    }

  }
}
