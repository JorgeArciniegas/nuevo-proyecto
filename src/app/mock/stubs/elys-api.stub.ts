import { 
  AccountDetails, 
  AccountOperatorDetails, 
  AccountVirtualSport, 
  AuthenticationShopClientAgentLoginRequest, 
  CouponLimitHierarchy, 
  CouponLimitHierarchyRequest, 
  CurrencyCodeRequest, 
  CurrencyCodeResponse, 
  TokenDataRequest, 
  TokenDataSuccess, 
  VirtualEventCountDownRequest, 
  VirtualEventCountDownResponse, 
  VirtualProgramTreeBySportRequest,
  VirtualProgramTreeBySportResponse,
  VirtualSportLastResultsRequest,
  VirtualSportLastResultsResponse} from "@elys/elys-api";
import { mockCouponLimit, mockCurrencyCodeResponse } from "../coupon.mock";
import { mockAccountVirtualSport, mockVirtualProgramTreeBySportResponse, mockVirtualSportLastResultsResponse } from "../sports.mock";
import { 
  mockOperatorData, 
  mockPassword, 
  mockTokenDataSuccess, 
  mockUserData, 
  mockUserId, 
  mockUsername } from "../user.mock";

export class ElysApiServiceStub {
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
  };
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
  };
  public virtual = {
    getAvailablevirtualsports(): Promise<AccountVirtualSport[]> {
      return new Promise((resolve, reject) => {
        resolve(mockAccountVirtualSport)
      })
    },
    getVirtualTreeV2(request: VirtualProgramTreeBySportRequest): Promise<VirtualProgramTreeBySportResponse> {
      return new Promise((resolve, reject) => {
        resolve(mockVirtualProgramTreeBySportResponse)
      })
    },
    getLastResult(request: VirtualSportLastResultsRequest): Promise<VirtualSportLastResultsResponse> {
      return new Promise((resolve, reject) => {
        resolve(mockVirtualSportLastResultsResponse)
      })
    },
    getCountdown(request: VirtualEventCountDownRequest): Promise<VirtualEventCountDownResponse> {
      return new Promise((resolve, reject) => {
        resolve({CountDown: 1193579691})
      })
    }
  };
}
