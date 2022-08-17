import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { timer } from 'rxjs';

import { ElysStorageLibModule } from '@elys/elys-storage-lib';
import { 
  AccountDetails, 
  AccountOperatorDetails, 
  AccountVirtualSport, 
  AuthenticationShopClientAgentLoginRequest, 
  CouponLimitHierarchy, 
  CouponLimitHierarchyRequest, 
  CurrencyCodeRequest, 
  CurrencyCodeResponse, 
  ElysApiService, 
  PlaySource, 
  TokenDataRequest, 
  TokenDataSuccess } from '@elys/elys-api';
import { ElysCouponModule } from '@elys/elys-coupon';

import { UserService } from './user.service';
import { VERSION } from '../../environments/version';
import { AppSettings } from '../app.settings';
import { StorageService } from './utility/storage/storage.service';
import { 
  mockOperatorData, 
  mockPassword, 
  mockToken, 
  mockTokenDataSuccess, 
  mockUserData, 
  mockUserId, 
  mockUsername } from '../mock/user.mock';
import { mockCouponLimit, mockCurrencyCodeResponse } from '../mock/coupon.mock';
import { mockAccountVirtualSport } from '../mock/sports.mock';
import { routes } from '../app-routing.module';
import { RouterService } from './utility/router/router.service';
import { environment } from 'src/environments/environment';
import { OperatorData } from './user.models';
import { TranslateUtilityService } from '../shared/language/translate-utility.service';

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

class TranslateUtilityServiceStub {
  changeLanguage(lang: string): void {}
  getTranslatedString(value: string): string {
    return ''
  }
}

describe('UserService', () => {
  let service: UserService;
  let storageService: StorageService;
  let api: ElysApiService;
  let routerService: RouterService;
  let appSettings: AppSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(routes),
          ElysStorageLibModule.forRoot({
            isCrypto: true,
            cryptoString: 'VgenStorage',
            KeyUnencodedList: ['versionApp', 'operatorData', 'callBackURL'],
            versionStorage: VERSION.version
          }),
          ElysCouponModule.forRoot({ deviceLayout: PlaySource.VDeskWeb }),
        ],
        providers: [
          AppSettings,
          { provide: ElysApiService, useClass: ElysApiServiceStub},
          { provide: TranslateUtilityService, useClass: TranslateUtilityServiceStub},
        ],
    });

    storageService = TestBed.inject(StorageService);
    storageService.destroy();

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

  it('decreasePlayableBalance() should decrease the played stake from Playable amount', () => {
    const mockUserDataClone = JSON.parse(JSON.stringify(mockUserData));
    service = TestBed.inject(UserService);

    service.dataUserDetail.userDetail = mockUserDataClone;
  
    service.decreasePlayableBalance(5);

    expect(service.dataUserDetail.userDetail.PlayableBalance).toEqual(20995);
  });

  it('increasePlayableBalance() should increase the played stake from Playable amount', () => {
    const mockUserDataClone = JSON.parse(JSON.stringify(mockUserData));
    service = TestBed.inject(UserService);

    service.dataUserDetail.userDetail = mockUserDataClone;

    service.increasePlayableBalance(5);

    expect(service.dataUserDetail.userDetail.PlayableBalance).toEqual(21005);
  });

  it('loadUserData() should be retrieve and save the admin user data', async () => {
    const token = mockToken;
    service = TestBed.inject(UserService);

    spyOn(service, 'setOperatorData');
    spyOn(service, 'getlimitsData');
    spyOn(service, 'checkAvailableSportAndSetPresetsAmount');
    spyOn(storageService, 'setData');

    await service.loadUserData(token, true);

    expect(service.dataUserDetail.userDetail).toEqual(mockUserData);
    expect(service.setOperatorData).toHaveBeenCalledWith({
      clientId: mockUserData.UserId,
      businessName: mockUserData.FirstName + ' - ' + mockUserData.LastName,
      adminLogged: true
    });
    expect(storageService.setData).toHaveBeenCalledWith('UserData', service.dataUserDetail);
    expect(service.userCurrency).toEqual(mockUserData.Currency);
    expect(service.getlimitsData).toHaveBeenCalled();
    expect(service.checkAvailableSportAndSetPresetsAmount).toHaveBeenCalled();
  });

  it('loadUserData() should be retrieve and save the operator user data', async () => {
    const token = mockToken;
    service = TestBed.inject(UserService);

    spyOn(service, 'setOperatorData');
    spyOn(service, 'getlimitsData');
    spyOn(service, 'checkAvailableSportAndSetPresetsAmount');
    spyOn(storageService, 'setData');

    await service.loadUserData(token, false);

    expect(service.dataUserDetail.operatorDetail).toEqual(mockOperatorData);
    expect(service.setOperatorData).toHaveBeenCalledWith({adminLogged: false});
    expect(storageService.setData).toHaveBeenCalledWith('UserData', service.dataUserDetail);
    expect(service.userCurrency).toEqual(mockOperatorData.CurrencyCode);
    expect(service.getlimitsData).toHaveBeenCalled();
    expect(service.checkAvailableSportAndSetPresetsAmount).toHaveBeenCalled();
  });

  it('loadUserData() should be return error string when incorect login and password', async () => {
    const mockErrorMessage = 'unauthorized user';
    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    spyOn(service, 'logout');
    spyOn(api.account, 'getOperatorMe').and.callFake(() => Promise.reject({
      status: 401,
      error: {
        Message: mockErrorMessage
      }
    }));

    await service.loadUserData('fake', false).then(e => expect(e).toEqual(mockErrorMessage));

    expect(service.logout).toHaveBeenCalled();
  });

  it('getlimitsData() should be retrieved and set coupon limit', async () => {
    const mockUserDataClone = JSON.parse(JSON.stringify(mockUserData));
    const operator: OperatorData = {
      ClientId: mockUserId,
      BusinessName: 'AdminName',
      isAdminLogged: true
    };
    storageService.setData('operatorData', operator);

    service = TestBed.inject(UserService);
    api = TestBed.inject(ElysApiService);

    service.dataUserDetail.userDetail = mockUserDataClone;

    const spyGetCouponLimits = spyOn(api.coupon, 'getCouponLimits').and.callThrough();
    spyOn(storageService, 'setData');

    service.getlimitsData();

    expect(spyGetCouponLimits).toHaveBeenCalledWith({
      CurrencyId: mockUserDataClone.UserCurrency.CurrencyId
    });

    await spyGetCouponLimits.calls.mostRecent().returnValue.then(() => {
      expect(service.dataUserDetail.couponLimit).toEqual(mockCouponLimit[3].CouponLimit);
      expect(storageService.setData).toHaveBeenCalledWith('UserData', service.dataUserDetail);
    })
  });

  it('isUserLogged() should be call storageService.checkIfExist() to check if a user is currently logged', () => {
    service = TestBed.inject(UserService);

    spyOn(storageService, 'checkIfExist');

    service.isUserLogged;

    expect(storageService.checkIfExist).toHaveBeenCalledWith('tokenData');
  });

  it('checkAvailableSportAndSetPresetsAmount() should be set defaultAmount on products from CouponPresetValues', async () => {
    const mockUserDataClone = JSON.parse(JSON.stringify(mockUserData));

    service = TestBed.inject(UserService);
    appSettings = TestBed.inject(AppSettings);

    service.dataUserDetail.userDetail = mockUserDataClone;
    appSettings.defaultAmount = null;

    await service.checkAvailableSportAndSetPresetsAmount();

    expect(appSettings.defaultAmount).toEqual(mockCurrencyCodeResponse.CouponPreset.CouponPresetValues);
  });

  it('checkAvailableSportAndSetPresetsAmount() should be match products result from api to products on the system', async () => {
    const mockUserDataClone = JSON.parse(JSON.stringify(mockUserData));

    service = TestBed.inject(UserService);
    appSettings = TestBed.inject(AppSettings);

    service.dataUserDetail.userDetail = mockUserDataClone;
    service.dataUserDetail.productIsLoaded = false;
    await service.checkAvailableSportAndSetPresetsAmount();
    // the mocked api hasn't sport with id 21 so into the app for this 
    // sport product.productSelected and product.isPlayable should be false
    expect(appSettings.products.find(item => item.sportId === 21).isPlayable).toBeFalse();
    expect(appSettings.products.find(item => item.sportId === 21).productSelected).toBeFalse();

    // the mocked AuthorizedVirtualSports hasn't sport with id 24 so into the app for this 
    // sport product.productSelected and product.isPlayable should be false
    expect(appSettings.products.find(item => item.sportId === 24).isPlayable).toBeFalse();
    expect(appSettings.products.find(item => item.sportId === 24).productSelected).toBeFalse();

    // the mocked AuthorizedVirtualCategories hasn't sport with codeProduct 'KENO' so into the app for this 
    // sport product.productSelected and product.isPlayable should be false
    expect(appSettings.products.find(item => item.codeProduct === 'KENO').isPlayable).toBeFalse();
    expect(appSettings.products.find(item => item.codeProduct === 'KENO').productSelected).toBeFalse();

    expect(service.dataUserDetail.productIsLoaded).toBeTrue();
  });

  it('getDefaultPreset() should be retrived CurrencyCodeResponse', async () => {
    service = TestBed.inject(UserService);
    await service.getDefaultPreset().then(d => {
      expect(d).toEqual(mockCurrencyCodeResponse)
    })
  });

  it('isAdminExist() should be call storageService.checkIfExist to check operatorData', () => {
    service = TestBed.inject(UserService);

    spyOn(storageService, 'checkIfExist');

    service.isAdminExist();

    expect(storageService.checkIfExist).toHaveBeenCalledWith('operatorData');
  });

  it('isLoggedOperator() should be call getOperatorData', () => {
    service = TestBed.inject(UserService);

    spyOn(service, 'getOperatorData');

    service.isLoggedOperator();

    expect(service.getOperatorData).toHaveBeenCalledWith('isAdminLogged');
  });

  it('getOperatorData() should be check operatorData by key', () => {
    service = TestBed.inject(UserService);

    const mockBusinessName = 'AdminName';
    const operator: OperatorData = {
      ClientId: mockUserId,
      BusinessName: mockBusinessName,
      isAdminLogged: true
    };

    storageService.setData('operatorData', operator);

    expect(service.getOperatorData('ClientId')).toEqual(mockUserId);
    expect(service.getOperatorData('BusinessName')).toEqual(mockBusinessName);
    expect(service.getOperatorData('FakeKey')).not.toBeDefined();
  });

  it('setOperatorData() should be set OperatorData in localStorage', () => {
    service = TestBed.inject(UserService);

    const mockBusinessName = 'AdminName';
    const mockOperatorData: OperatorData = {
      ClientId: mockUserId,
      BusinessName: mockBusinessName,
      isAdminLogged: true
    };
    const mockReq = {
      clientId: mockOperatorData.ClientId,
      businessName: mockOperatorData.BusinessName,
      adminLogged: mockOperatorData.isAdminLogged
    };

    spyOn(storageService, 'setData').and.callThrough();
    service.setOperatorData(mockReq);

    expect(localStorage.getItem('operatorData')).toEqual(JSON.stringify(mockOperatorData));
    expect(storageService.setData).toHaveBeenCalledWith('operatorData', mockOperatorData);
  });

  it('removeDataCtd() should be delete OperatorData from localStorage', () => {
    service = TestBed.inject(UserService);

    const mockBusinessName = 'AdminName';
    const mockReq = {
      clientId: mockUserId,
      businessName: mockBusinessName,
      adminLogged: true
    };

    spyOn(storageService, 'removeItems').and.callThrough();
    service.setOperatorData(mockReq);
    service.removeDataCtd();

    expect(localStorage.getItem('operatorData')).toBeFalsy();
    expect(storageService.removeItems).toHaveBeenCalledWith('operatorData');
  });

  it('getUserId() should be get userId from UserData', () => {
    service = TestBed.inject(UserService);
    const changedMockUserId = 123;
    const mockBusinessName = 'AdminName';

    const mockReq = {
      clientId: changedMockUserId,
      businessName: mockBusinessName,
      adminLogged: true
    };

    const mockDataUserDetail = {
      userDetail: mockUserData
    }

    service.setOperatorData(mockReq); //set operatorData with adminLogged
    storageService.setData('UserData', mockDataUserDetail); //set UserData

    expect(service.getUserId()).toEqual(mockUserId);
  });

  it('getUserId() should be get userId from operatorData', () => {
    service = TestBed.inject(UserService);
    const changedMockUserId = 123;
    const mockBusinessName = 'AdminName';

    const mockReq = {
      clientId: changedMockUserId,
      businessName: mockBusinessName,
      adminLogged: false
    };

    const mockDataUserDetail = {
      userDetail: mockUserData
    }

    service.setOperatorData(mockReq); //set operatorData without adminLogged
    storageService.setData('UserData', mockDataUserDetail); //set dataUserDetail

    expect(service.getUserId()).toEqual(changedMockUserId);
  });

  it('getAuthorization() should be get UserPolicies from userDetail', () => {
    service = TestBed.inject(UserService);

    // dataUserDetail with userDetail
    const mockDataUserDetail = {
      userDetail: mockUserData
    }

    service.dataUserDetail = mockDataUserDetail; //set dataUserDetail

    expect(service.getAuthorization()).toEqual(mockUserData.UserPolicies);
  });

  it('getAuthorization() should be get UserPolicies from operatorDetail', () => {
    service = TestBed.inject(UserService);

    // dataUserDetail with operatorDetail
    const mockDataUserDetail = {
      operatorDetail: mockOperatorData
    }

    service.dataUserDetail = mockDataUserDetail; //set dataUserDetail

    expect(service.getAuthorization()).toEqual(mockOperatorData.UserPolicies);
  });

});