import { TestBed } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';

import { ElysApiService } from '@elys/elys-api';
import { ElysFeedsService } from '@elys/elys-feeds';

import { MainService } from './main.service';
import { ProductsService } from '../products.service';
import { BtncalcService } from 'src/app/component/btncalc/btncalc.service';
import { CouponService } from 'src/app/component/coupon/coupon.service';
import { DestroyCouponService } from 'src/app/component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { UserService } from 'src/app/services/user.service';
import { CouponConfirmDelete } from '../products.model';
import { mockEventDetail } from 'src/app/mock/mine.mock';
import { Products } from 'src/environments/environment.models';
import { mockProduct } from 'src/app/mock/product.mock';
import { ElysApiServiceStub } from 'src/app/mock/stubs/elys-api.stub';
import { EventTime } from './main.models';

class ProductsServiceStub {
  productNameSelectedSubscribe: Subject<string>;
  productNameSelectedObserve: Observable<string>;

  playableBoardResetObserve: Observable<boolean> = new Subject<boolean>();

  product: Products;

  constructor(){
    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();
  }
}

class BtncalcServiceStub {
  
}

class CouponServiceStub {
  productHasCoupon: CouponConfirmDelete;
  constructor(){
    this.productHasCoupon = { checked: false };
  }
  resetCoupon(): void {}
}

class DestroyCouponServiceStub {
  
}

class ElysFeedsServiceStub {
  
}

class UserServiceStub {
  
}

describe('MainService', () => {
  let service: MainService;
  let spyCreatePlayerList: jasmine.Spy<() => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [],
        providers: [
          MainService,
          { provide: ElysApiService, useClass: ElysApiServiceStub},
          { provide: ElysFeedsService, useClass: ElysFeedsServiceStub},
          { provide: ProductsService, useClass: ProductsServiceStub},
          { provide: BtncalcService, useClass: BtncalcServiceStub},
          { provide: CouponService, useClass: CouponServiceStub},
          { provide: DestroyCouponService, useClass: DestroyCouponServiceStub},
          { provide: UserService, useClass: UserServiceStub},
        ],
    });
    spyCreatePlayerList = spyOn(MainService.prototype, 'createPlayerList');
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call createPlayerList and set toResetAllSelections as true', () => {
    expect(spyCreatePlayerList).toHaveBeenCalled();
    expect(service.toResetAllSelections).toBeTrue();
  });

  it('should be call initEvents', () => {
    spyOn(service, 'initEvents');
    const productService = TestBed.inject(ProductsService);
    const couponService = TestBed.inject(CouponService);

    couponService.productHasCoupon.checked = false;
    productService.productNameSelectedSubscribe.next();

    expect(service.initEvents).toHaveBeenCalled();
  });

  it('should be set eventDetails, remainingTime and call resetPlayEvent and resetCoupon', async () => {
    const mockEventTime: EventTime = {
      minute: 1,
      second: 45,
    }
    const mockEventIndex = 0;
    const mockEventDetailClone = JSON.parse(JSON.stringify(mockEventDetail));
    const couponService = TestBed.inject(CouponService);
    const productsService = TestBed.inject(ProductsService);

    productsService.product = mockProduct;

    spyOn(service, 'resetPlayEvent');
    spyOn(couponService, 'resetCoupon');
    const spyremainingEventTime = spyOn(service, 'remainingEventTime').and.returnValue(Promise.resolve(mockEventTime));

    service.eventDetails = mockEventDetailClone;
    service.currentEventSubscribe.next(mockEventIndex);

    await spyremainingEventTime.calls.mostRecent().returnValue.then(() => {
      expect(service.eventDetails.eventTime).toEqual(mockEventTime);
      expect(service.remainingTime.minute).toEqual(mockEventTime.minute);
      expect(service.remainingTime.second).toEqual(mockEventTime.second);
    })
    
    expect(service.eventDetails.currentEvent).toEqual(mockEventIndex);
    expect(service.resetPlayEvent).toHaveBeenCalled();
    expect(couponService.resetCoupon).toHaveBeenCalled();
  });

});