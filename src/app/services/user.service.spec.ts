import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Location } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { AccountDetails, AccountOperatorDetails, AccountVirtualSport, AuthenticationShopClientAgentLoginRequest, CouponLimitHierarchy, CouponLimitHierarchyRequest, CurrencyCodeRequest, CurrencyCodeResponse, ElysApiService, PlaySource, TokenDataRequest, TokenDataSuccess } from '@elys/elys-api';
import { ElysCouponModule } from '@elys/elys-coupon';

import { UserService } from './user.service';
import { VERSION } from '../../environments/version';
import { AppSettings } from '../app.settings';
import { HttpLoaderFactory } from '../app.module';
import { StorageService } from './utility/storage/storage.service';
import { mockOperatorData, mockPassword, mockToken, mockTokenDataSuccess, mockUserData, mockUserId, mockUsername } from '../mock/user.mock';
import { mockCouponLimit, mockCurrencyCodeResponse } from '../mock/coupon.mock';
import { mockAccountVirtualSport } from '../mock/sports.mock';
import { timer } from 'rxjs';
import { routes } from '../app-routing.module';
import { RouterService } from './utility/router/router.service';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

// class MockRouter {
//   navigateByUrl(url: string): void { }
// }

describe('UserService', () => {
  let service: UserService;
  let storageService: StorageService;
  let api: ElysApiService;
  //let location: Location;
  let routerService: RouterService;
  let appSettings: AppSettings;
  //let router: Router;

  //const mockToken = 'MOCK_TOKEN';

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes(routes),
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
          //{ provide: Router, useClass: MockRouter },
          { provide: ElysApiService, useClass: ElysApiServiceStub},
        ],
    });

    //service = TestBed.inject(UserService);
    storageService = TestBed.inject(StorageService);
    storageService.removeItems();
    //location = TestBed.inject(Location);
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

  it('login() should be called method postAccessToken() with username and password', async () => {
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    spyOn(api.account, 'postAccessToken').and.callThrough();
    spyOn(service, 'loadUserData').and.callFake((token: string, loginAdmin?: Boolean) => Promise.resolve(''));

    await service.login(mockUsername, mockPassword);
    expect(api.account.postAccessToken).toHaveBeenCalledWith({username: mockUsername, password: mockPassword});
  });

  it('login() should be called method loadUserData() with access_token and loginAdmin == true', async () => {
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    spyOn(service, 'loadUserData').and.callFake((token: string, loginAdmin?: Boolean) => Promise.resolve(''));

    await service.login(mockUsername, mockPassword);
    expect(service.loadUserData).toHaveBeenCalledWith(mockTokenDataSuccess.access_token, true);
  });

  it('login() should be return error string when incorect login and password', async () => {
    service = TestBed.inject(UserService);
    await service.login('fake', 'fake').then(d => expect(d).toEqual('LOGIN_MESSAGES.The user name or password is incorrect'));
  });

  it('loginOperator() should be called method clientLoginRequest() with username, password and userId', async () => {
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    spyOn(api.account, 'clientLoginRequest').and.callThrough();
    spyOn(service, 'getOperatorData').and.returnValue(mockUserId);
    spyOn(service, 'loadUserData').and.callFake((token: string, loginAdmin?: Boolean) => Promise.resolve(''));

    await service.loginOperator(mockUsername, mockPassword);
    expect(api.account.clientLoginRequest).toHaveBeenCalledWith({Username: mockUsername, Password: mockPassword, UserId: mockUserId});
  });

  it('loginOperator() should be called method loadUserData() with access_token and loginAdmin == false', async () => {
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    spyOn(service, 'getOperatorData').and.returnValue(mockUserId);
    spyOn(service, 'loadUserData').and.callFake((token: string, loginAdmin?: Boolean) => Promise.resolve(''));

    await service.loginOperator(mockUsername, mockPassword);
    expect(service.loadUserData).toHaveBeenCalledWith(mockTokenDataSuccess.access_token, false);
  });

  it('loginOperator() should be return error string when incorect login and password', async () => {
    service = TestBed.inject(UserService);
    await service.loginOperator('fake', 'fake').then(d => expect(d).toEqual('LOGIN_MESSAGES.The user name or password is incorrect'));
  });

  it('removeTrailingDot() should be return string without trailing dot', () => {
    const mockString = 'mockString';
    service = TestBed.inject(UserService);
    expect(service.removeTrailingDot(mockString + '.')).toEqual('mockString');
  });

  it('logout() should be clear the storage data and the token from vgen.service', () => {
    const mockDataUser = {userDetail: mockUserData};
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    service.dataUserDetail = mockDataUser;
    storageService.setData('tokenData', mockToken);
    storageService.setData('UserData', mockDataUser);
    api.tokenBearer = mockToken;

    service.logout();
    expect(service.dataUserDetail.userDetail).toBeNull();
    expect(api.tokenBearer).toBeNull();
    expect(storageService.checkIfExist('tokenData')).toBeFalsy();
    expect(storageService.checkIfExist('UserData')).toBeFalsy();
  });

  it('logout() should be navigated to login page', () => {
    service = TestBed.inject(UserService);
    routerService = TestBed.inject(RouterService);
    appSettings = TestBed.inject(AppSettings);

    appSettings.loginInteractive = true;
    spyOn(routerService.getRouter(), 'navigateByUrl');
    service.logout();
    expect(routerService.getRouter().navigateByUrl).toHaveBeenCalledWith('/login');
    appSettings.loginInteractive = environment.loginInteractive;
  });

  it('logout() should be call router.callBackToBrand()', () => {
    service = TestBed.inject(UserService);
    routerService = TestBed.inject(RouterService);
    appSettings = TestBed.inject(AppSettings);
    
    appSettings.loginInteractive = false;
    spyOn(routerService, 'callBackToBrand');
    service.logout();
    expect(routerService.callBackToBrand).toHaveBeenCalled();
    appSettings.loginInteractive = environment.loginInteractive;
  });

});