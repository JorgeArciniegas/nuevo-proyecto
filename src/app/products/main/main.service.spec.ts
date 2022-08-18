import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountDetails, AccountOperatorDetails, AccountVirtualSport, AuthenticationShopClientAgentLoginRequest, CouponLimitHierarchy, CouponLimitHierarchyRequest, CurrencyCodeRequest, CurrencyCodeResponse, ElysApiService, PlaySource, TokenDataRequest, TokenDataSuccess } from '@elys/elys-api';
import { mockCouponLimit, mockCurrencyCodeResponse } from 'src/app/mock/coupon.mock';
import { mockAccountVirtualSport } from 'src/app/mock/sports.mock';
import { mockOperatorData, mockPassword, mockTokenDataSuccess, mockUserData, mockUserId, mockUsername } from 'src/app/mock/user.mock';
import { MainService } from './main.service';
import { routes } from '../../app-routing.module';
import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { VERSION } from '../../../environments/version';
import { ElysCouponModule } from '@elys/elys-coupon';
import { AppSettings } from 'src/app/app.settings';
import { TranslateUtilityService } from 'src/app/shared/language/translate-utility.service';
import { ProductsService } from '../products.service';
import { BtncalcService } from 'src/app/component/btncalc/btncalc.service';
import { CouponService } from 'src/app/component/coupon/coupon.service';
import { DestroyCouponService } from 'src/app/component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { ElysFeedsService } from '@elys/elys-feeds';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subject } from 'rxjs';
import { CouponConfirmDelete } from '../products.model';
import { EventDetail, EventTime } from './main.models';
import { mockEventDetail, mockEventTime, mockProduct } from 'src/app/mock/mine.mock';
import { Products } from 'src/environments/environment.models';

class ElysApiServiceStub {
  public tokenBearer: string;
  public account = {
    getMe(): Promise<AccountDetails> {
      return new Promise((resolve, reject) => {
        resolve(mockUserData)
      })
    },
    getOperatorMe(): Promise<AccountOperatorDetails> {
      return new Promise((resolve, reject) => {
        resolve(mockOperatorData)
      })
    },
    postAccessToken(request: TokenDataRequest): Promise<TokenDataSuccess> {
      return new Promise((resolve, reject) => {
        if(request.username === mockUsername && request.password === mockPassword) {
          resolve(mockTokenDataSuccess)
        } else reject({
          error: 400,
          error_description: 'The user name or password is incorrect',
          message: 'The user name or password is incorrect'
        })
      })
    },
    clientLoginRequest(request: AuthenticationShopClientAgentLoginRequest): Promise<TokenDataSuccess> {
      return new Promise((resolve, reject) => {
        if(request.Username === mockUsername && request.Password === mockPassword && request.UserId === mockUserId) {
          resolve(mockTokenDataSuccess)
        } else reject({
          error: 400,
          error_description: 'The user name or password is incorrect',
          message: 'The user name or password is incorrect'
        })
      })
    }
  }
  public coupon = {
    getCouponLimits(request: CouponLimitHierarchyRequest): Promise<CouponLimitHierarchy[]> {
      return new Promise((resolve, reject) => {
        resolve(mockCouponLimit)
      })
    },
    getCouponRelatedCurrency(request: CurrencyCodeRequest): Promise<CurrencyCodeResponse> {
      return new Promise((resolve, reject) => {
        resolve(mockCurrencyCodeResponse)
      })
    }
  }
  public virtual = {
    getAvailablevirtualsports(): Promise<AccountVirtualSport[]> {
      return new Promise((resolve, reject) => {
        resolve(mockAccountVirtualSport)
      })
    }
  }
}

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
        imports: [
          // RouterTestingModule.withRoutes(routes),
          // ElysStorageLibModule.forRoot({
          //   isCrypto: true,
          //   cryptoString: 'VgenStorage',
          //   KeyUnencodedList: ['versionApp', 'operatorData', 'callBackURL'],
          //   versionStorage: VERSION.version
          // }),
          // ElysCouponModule.forRoot({ deviceLayout: PlaySource.VDeskWeb }),
        ],
        providers: [
          MainService,
          // AppSettings,
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