import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { AccountDetails, AccountOperatorDetails, AccountVirtualSport, CouponLimitHierarchy, CouponLimitHierarchyRequest, CurrencyCodeRequest, CurrencyCodeResponse, ElysApiService, PlaySource } from '@elys/elys-api';
import { ElysCouponModule } from '@elys/elys-coupon';

import { UserService } from './user.service';
import { VERSION } from '../../environments/version';
import { AppSettings } from '../app.settings';
import { HttpLoaderFactory } from '../app.module';
import { StorageService } from './utility/storage/storage.service';
import { mockOperatorData, mockUserData } from '../mock/user.mock';
import { mockCouponLimit, mockCurrencyCodeResponse } from '../mock/coupon.mock';
import { mockAccountVirtualSport } from '../mock/sports.mock';
import { timer } from 'rxjs';

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

describe('UserService', () => {
  let service: UserService;
  let storageService: StorageService;
  let api: ElysApiService;

  const mockToken = 'MOCK_TOKEN';

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([]),
          ElysStorageLibModule.forRoot({
            isCrypto: true,
            cryptoString: 'VgenStorage',
            KeyUnencodedList: ['versionApp', 'operatorData', 'callBackURL'],
            versionStorage: VERSION.version
          }),
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
          ElysCouponModule.forRoot({ deviceLayout: PlaySource.VDeskWeb }),
        ],
        providers: [
          StorageService,
          AppSettings,
          StorageService,
          { provide: ElysApiService, useClass: ElysApiServiceStub},
        ],
    });

    //service = TestBed.inject(UserService);
    storageService = TestBed.inject(StorageService);
    storageService.removeItems();
  });

  it('should be created', () => {
    service = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  it('should be setted userCurrency as defaul', () => {
    service = TestBed.inject(UserService);
    expect(service.userCurrency).toBeTruthy();
  });

  it('should be called method checkLoginData()', () => {
    spyOn(UserService.prototype, 'checkLoginData');
    service = TestBed.inject(UserService);
    expect(UserService.prototype.checkLoginData).toHaveBeenCalled();
  });

  it('checkLoginData() should be called method loadUserData() and set token in ElysApiService', (done) => {
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);
    storageService.setData('tokenData', mockToken);
    spyOn(service, 'loadUserData');
    service.checkLoginData();
    timer(0).subscribe(() => {
      expect(service.loadUserData).toHaveBeenCalled();
      done();
    })
    expect(api.tokenBearer).toEqual(mockToken);
  
  });

});