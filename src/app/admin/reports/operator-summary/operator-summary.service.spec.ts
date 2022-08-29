import { TestBed } from '@angular/core/testing';
import { ElysApiService } from '@elys/elys-api';
import { ElysApiServiceStub } from 'src/app/mock/stubs/elys-api.stub';
import { mockUserData, mockUserId } from 'src/app/mock/user.mock';
import { DataUser } from 'src/app/services/user.models';
import { UserService } from 'src/app/services/user.service';
import { OperatorSummaryService } from './operator-summary.service';
import { RouterService } from 'src/app/services/utility/router/router.service';
import { mockReportsOperatorVolumeResponse } from 'src/app/mock/operators.mock';

class UserServiceStub {
  dataUserDetail: DataUser = {userDetail: JSON.parse(JSON.stringify(mockUserData))};
};

class RouterStub {
  navigateByUrl = jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve());
};

class RouterServiceStub {
  router: RouterStub;

  constructor() {
    this.router = new RouterStub();
  }

  getRouter() {
    return this.router;
  }
};

describe('OperatorsService', () => {
  let service: OperatorSummaryService;
  let api: ElysApiServiceStub;
  let userService: UserServiceStub;
  let router: RouterServiceStub;
  let spyInitResetRequest: jasmine.Spy<() => void>;
  beforeEach(() => {
    api = new ElysApiServiceStub();
    userService = new UserServiceStub();
    router = new RouterServiceStub();
    TestBed.configureTestingModule({
        imports: [],
        providers: [
          OperatorSummaryService,
          { provide: ElysApiService, useValue: api},
          { provide: UserService, useValue: userService},
          { provide: RouterService, useValue: router},
        ],
    });
    spyInitResetRequest = spyOn(OperatorSummaryService.prototype, 'initResetRequest').and.callThrough();
    service = TestBed.inject(OperatorSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(spyInitResetRequest).toHaveBeenCalled();
  });

  it('should be get dateFrom', () => {
    const today = new Date();
    expect(service.dateFrom).toEqual(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
  });

  it('should be set dateFrom', () => {
    service.dateFrom = new Date('2022-04-25T00:00:00');
    expect(service.dateFrom).toEqual(new Date('2022-04-25T00:00:00'));
  });

  it('should be get dateTo', () => {
    const today = new Date();
    expect(service.dateTo).toEqual(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59));
  });

  it('should be set dateTo', () => {
    service.dateTo = new Date('2022-04-25T00:00:00');
    expect(service.dateTo).toEqual(new Date('2022-04-25T23:59:59'));
  });

  it('getList() should be retrieved operators report and set total amounts', async () => {
    await service.getList();

    expect(service.reportsOperatorVolumeResponse).toEqual(mockReportsOperatorVolumeResponse);
    expect(service.totalStake).toBe(9);
    expect(service.totalVoided).toBe(0);
    expect(service.totalWon).toBe(0);
    expect(router.getRouter().navigateByUrl).toHaveBeenCalledWith('admin/reports/operatorSummary/operatorSummaryList')
  });

  it('initResetRequest() should be set reportsOperatorVolumeRequest', () => {
    const today = new Date();
    const expectedReport = {
      userId: mockUserId,
      dateFrom: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      dateTo: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
    }

    service.initResetRequest();

    expect(service.reportsOperatorVolumeRequest).toEqual(expectedReport);
  });

});