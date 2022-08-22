import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, Subject, timer } from 'rxjs';

import { ElysApiService, PlaySource } from '@elys/elys-api';
import { ElysFeedsService } from '@elys/elys-feeds';

import { MainService } from './main.service';
import { ProductsService } from '../products.service';
import { BtncalcService } from 'src/app/component/btncalc/btncalc.service';
import { CouponService } from 'src/app/component/coupon/coupon.service';
import { DestroyCouponService } from 'src/app/component/coupon/confirm-destroy-coupon/destroy-coupon.service';
import { UserService } from 'src/app/services/user.service';
import { CouponConfirmDelete } from '../products.model';
import { mockEventDetail, mockEventInfo, mockPlayerList, mockVirtualGetRankByEventResponse } from 'src/app/mock/mine.mock';
import { Products } from 'src/environments/environment.models';
import { mockProduct } from 'src/app/mock/product.mock';
import { ElysApiServiceStub } from 'src/app/mock/stubs/elys-api.stub';
import { EventDetail, EventTime } from './main.models';
import { mockUserId } from 'src/app/mock/user.mock';
import { ColourGameId } from './colour-game.enum';
import { ResultsService } from './results/results.service';
import { Results } from './results/results';
import { mockFirstEvDuration, mockFirstEvId, mockTsMft, mockVirtualBetTournamentExtended } from 'src/app/mock/sports.mock';

class ProductServiceStub {
  productNameSelectedSubscribe: Subject<string>;
  productNameSelectedObserve: Observable<string>;

  playableBoardResetSubject: Subject<boolean>;
  playableBoardResetObserve: Observable<boolean>;

  product: Products;

  constructor(){
    this.productNameSelectedSubscribe = new Subject<string>();
    this.productNameSelectedObserve = this.productNameSelectedSubscribe.asObservable();

    this.playableBoardResetSubject = new Subject<boolean>();
    this.playableBoardResetObserve = this.playableBoardResetSubject.asObservable();
  }

  closeProductDialog(): void {}
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

class ResultsServiceStub {
  resultsUtils = new Results();
  getLastResult() {};
}

class UserServiceStub {
  getUserId(): number {
    return mockUserId
  }
  get isUserLogged(): boolean {
    return true
  }
}

describe('MainService', () => {
  let service: MainService;
  let spyCreatePlayerList: jasmine.Spy<() => void>;
  let productService: ProductServiceStub;
  let couponService: CouponServiceStub;
  let userService: UserServiceStub;
  let resultService: ResultsServiceStub;
  let elysApiService: ElysApiServiceStub;
  beforeEach(() => {
    productService = new ProductServiceStub();
    couponService = new CouponServiceStub();
    userService = new UserServiceStub();
    resultService = new ResultsServiceStub();
    elysApiService = new ElysApiServiceStub();
    TestBed.configureTestingModule({
        imports: [],
        providers: [
          MainService,
          { provide: ProductsService, useValue: productService},
          { provide: CouponService, useValue: couponService},
          { provide: UserService, useValue: userService},
          { provide: ResultsService, useValue: resultService},
          { provide: ElysApiService, useValue: elysApiService},
          { provide: ElysFeedsService, useClass: ElysFeedsServiceStub},
          { provide: BtncalcService, useClass: BtncalcServiceStub},
          { provide: DestroyCouponService, useClass: DestroyCouponServiceStub},
        ],
    });
    spyCreatePlayerList = spyOn(MainService.prototype, 'createPlayerList').and.callThrough();
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call createPlayerList and set toResetAllSelections as true', () => {
    expect(spyCreatePlayerList).toHaveBeenCalled();
    expect(service.toResetAllSelections).toBeTrue();
    expect(JSON.stringify(service.playersList)).toEqual(JSON.stringify(mockPlayerList))
  });

  it('should be call initEvents', () => {
    spyOn(service, 'initEvents');

    couponService.productHasCoupon.checked = false;
    productService.productNameSelectedSubscribe.next();

    expect(service.initEvents).toHaveBeenCalled();
  });

  it('should be set eventDetails, remainingTime and call resetPlayEvent and resetCoupon', async () => {
    const mockEventTime: EventTime = {
      minute: 1,
      second: 3,
    }
    const mockEventIndex = 0;

    productService.product = mockProduct;

    spyOn(service, 'resetPlayEvent');
    spyOn(couponService, 'resetCoupon');
    const spyremainingEventTime = spyOn(service, 'remainingEventTime').and.returnValue(Promise.resolve(mockEventTime));

    service.eventDetails = JSON.parse(JSON.stringify(mockEventDetail));

    service.currentEventSubscribe.next(mockEventIndex);

    await spyremainingEventTime.calls.mostRecent().returnValue.then(() => {
      expect(service.eventDetails.eventTime).toEqual(mockEventTime);
      expect(service.remainingTime.minute).toEqual(mockEventTime.minute);
      expect(service.remainingTime.second).toEqual(mockEventTime.second);
    });
    
    expect(service.eventDetails.currentEvent).toEqual(mockEventIndex);
    expect(service.resetPlayEvent).toHaveBeenCalled();
    expect(couponService.resetCoupon).toHaveBeenCalled();
  });

  it('should be set toResetAllSelections as true and call resumeCountDown and resetPlayEvent', fakeAsync(() => {
    spyOn(service, 'resumeCountDown');
    spyOn(service, 'resetPlayEvent');

    service.toResetAllSelections = false;

    productService.playableBoardResetSubject.next(true);
    
    expect(service.toResetAllSelections).toBeTrue();
    expect(service.resumeCountDown).toHaveBeenCalled();
    tick(500);
    expect(service.resetPlayEvent).toHaveBeenCalled();
  }));

  it('resumeCountDown() should be call currentAndSelectedEventTime and call getTime every 1 sec', fakeAsync(() => {
    spyOn(service, 'currentAndSelectedEventTime');
    spyOn(service, 'getTime');

    service.resumeCountDown();

    expect(service.currentAndSelectedEventTime).toHaveBeenCalled();
    tick(1000);
    expect(service.getTime).toHaveBeenCalled();
    service.countdownSub.unsubscribe();
  }));

  it('destroy() should be unsubscribed from countdownSub', () => {
    spyOn(service, 'getTime');

    service.resumeCountDown();
    spyOn(service.countdownSub, 'unsubscribe').and.callThrough();

    service.destroy();

    expect(service.countdownSub.unsubscribe).toHaveBeenCalled();
    expect(service.initCurrentEvent).toBeTrue();
  });

  it('initEvents() should be call loadEvents and set initCurrentEvent, selectedColourGameId, eventDetails', () => {
    spyOn(service, 'loadEvents');

    productService.product = mockProduct;

    service.initEvents();

    expect(service.loadEvents).toHaveBeenCalled();
    expect(service.initCurrentEvent).toBeTrue();
    expect(service.selectedColourGameId).toEqual(ColourGameId.bet49);
    expect(service.eventDetails).toEqual(new EventDetail(mockProduct.layoutProducts.nextEventItems))
  });

  it('getTime() should be stop the countdown and call loadEvents (case 1)', () => {
    spyOn(service, 'loadEvents');
    service.countdownSub = timer(0, 1000).subscribe();
    spyOn(service.countdownSub, 'unsubscribe').and.callThrough();

    spyOnProperty(userService, 'isUserLogged').and.returnValue(true);
    service.remainingTime.second = 0;
    service.remainingTime.minute = 0;

    service.getTime();
    expect(service.loadEvents).toHaveBeenCalled();
    expect(service.countdownSub.unsubscribe).toHaveBeenCalled();
  });

  it('getTime() should be stop the countdown and call loadEvents (case 2)', () => {
    spyOn(service, 'loadEvents');
    service.countdownSub = timer(0, 1000).subscribe();
    spyOn(service.countdownSub, 'unsubscribe').and.callThrough();

    spyOnProperty(userService, 'isUserLogged').and.returnValue(false);
    service.remainingTime.second = 1;
    service.remainingTime.minute = 0;

    service.getTime();
    expect(service.loadEvents).toHaveBeenCalled();
    expect(service.countdownSub.unsubscribe).toHaveBeenCalled();
  });

  it('getTime() should be stop the countdown and call loadEvents (case 3)', () => {
    spyOn(service, 'loadEvents');
    service.countdownSub = timer(0, 1000).subscribe();
    spyOn(service.countdownSub, 'unsubscribe').and.callThrough();

    spyOnProperty(userService, 'isUserLogged').and.returnValue(true);
    service.remainingTime.second = -1;
    service.remainingTime.minute = 0;

    service.getTime();
    expect(service.loadEvents).toHaveBeenCalled();
    expect(service.countdownSub.unsubscribe).toHaveBeenCalled();
  });

  it('getTime() should be set second=59 and decrement minute by 1', () => {
    const mockMinute = 3;
    const mockSecond = 59;

    spyOn(service, 'loadEvents');
    service.countdownSub = timer(0, 1000).subscribe();
    service.eventDetails = new EventDetail(mockProduct.layoutProducts.nextEventItems);
    service.remainingTime.second = 0;
    service.remainingTime.minute = mockMinute;
    service.eventDetails.eventTime.minute = mockMinute;

    service.getTime();

    expect(service.remainingTime.second).toBe(mockSecond);
    expect(service.remainingTime.minute).toBe(mockMinute - 1);
    expect(service.eventDetails.eventTime.second).toBe(mockSecond);
    expect(service.eventDetails.eventTime.minute).toBe(mockMinute - 1);

    expect(resultService.resultsUtils.countDown).toEqual(service.remainingTime);

    service.countdownSub.unsubscribe();
  });

  it('getTime() should be decrement second by 1', () => {
    const mockMinute = 3;
    const mockSecond = 15;

    spyOn(service, 'loadEvents');
    service.countdownSub = timer(0, 1000).subscribe();
    service.eventDetails = new EventDetail(mockProduct.layoutProducts.nextEventItems);
    service.remainingTime.second = mockSecond;
    service.remainingTime.minute = mockMinute;
    service.eventDetails.eventTime.minute = mockMinute;

    service.getTime();

    expect(service.remainingTime.second).toBe(mockSecond - 1);
    expect(service.remainingTime.minute).toBe(mockMinute);
    expect(service.eventDetails.eventTime.second).toBe(mockSecond - 1);
    expect(service.eventDetails.eventTime.minute).toBe(mockMinute);
    
    expect(resultService.resultsUtils.countDown).toEqual(service.remainingTime);
    expect(service.placingEvent.timeBlocked).toBeFalse();

    service.countdownSub.unsubscribe();
  });

  it('getTime() should be call closeProductDialog', () => {
    const mockMinute = 0;
    const mockSecond = 5;

    spyOn(service, 'loadEvents');
    spyOn(productService, 'closeProductDialog');
    service.countdownSub = timer(0, 1000).subscribe();
    service.eventDetails = new EventDetail(mockProduct.layoutProducts.nextEventItems);
    service.remainingTime.second = mockSecond;
    service.remainingTime.minute = mockMinute;
    service.eventDetails.eventTime.minute = mockMinute;
    service.eventDetails.eventTime.second = mockSecond;

    service.getTime();
    
    expect(resultService.resultsUtils.countDown).toEqual(service.remainingTime);
    expect(service.placingEvent.timeBlocked).toBeTrue();
    expect(productService.closeProductDialog).toHaveBeenCalled();

    service.countdownSub.unsubscribe();
  });

  it('loadEvents() should be call loadEventsFromApi, getLastResult, getTime', fakeAsync(() => {
    spyOn(resultService, 'getLastResult');

    spyOn(service, 'loadEventsFromApi').and.returnValue(Promise.resolve());
    spyOn(service, 'getTime');
    service.initCurrentEvent = true;

    service.loadEvents();

    expect(service.loadEventsFromApi).toHaveBeenCalled();
    tick(1000);
    expect(resultService.getLastResult).toHaveBeenCalled();
    expect(service.getTime).toHaveBeenCalled();

    service.countdownSub.unsubscribe();
  }));

  it('loadEvents() should be call loadEventsFromApi, getLastResult, slideToNextEvent, currentAndSelectedEventTime, getTime', fakeAsync(() => {
    spyOn(resultService, 'getLastResult');
    spyOn(service, 'loadEventsFromApi').and.callThrough();
    spyOn(service, 'getTime');
    spyOn(service, 'currentAndSelectedEventTime');

    service.initCurrentEvent = false;
    service.eventDetails = new EventDetail(mockProduct.layoutProducts.nextEventItems);
    productService.product = mockProduct;

    service.loadEvents();

    expect(service.loadEventsFromApi).toHaveBeenCalledWith(service.eventDetails.events[0]);
    tick(1000);
    expect(resultService.getLastResult).toHaveBeenCalled();
    expect(service.getTime).toHaveBeenCalled();
    expect(service.currentAndSelectedEventTime).toHaveBeenCalled();

    service.countdownSub.unsubscribe();
  }));

  it('loadEventsFromApi() should be ', async () => {
    const mockRequest = {
      SportIds: mockProduct.sportId.toString(),
      CategoryTypes: mockProduct.codeProduct,
      Source: PlaySource.VDeskWeb,
      Item: mockUserId
    };
    const mockEvents = [
      {
        number: 21254738, 
        label: 'Race n. 232', 
        date: new Date('2022-08-18T09:51:00+02:00')
      }, 
      {
        number: 21254748, 
        label: 'Race n. 234', 
        date: new Date('2022-08-18T09:53:00+02:00')
      }, 
      {
        number: 21254750, 
        label: 'Race n. 236', 
        date: new Date('2022-08-18T09:55:00+02:00')
      }, 
      {
        number: 21254752, 
        label: 'Race n. 238', 
        date: new Date('2022-08-18T09:57:00+02:00')
      }, 
      {
        number: 21254754, 
        label: 'Race n. 240', 
        date: new Date('2022-08-18T09:59:00+02:00')
      }
    ]

    spyOn(service, 'getTime');
    spyOn(service, 'currentAndSelectedEventTime');
    spyOn(elysApiService.virtual, 'getVirtualTreeV2').and.callThrough();

    service.initCurrentEvent = true;
    service.eventDetails = new EventDetail(mockProduct.layoutProducts.nextEventItems);
    productService.product = mockProduct;

    await service.loadEventsFromApi();

    expect(elysApiService.virtual.getVirtualTreeV2).toHaveBeenCalledWith(mockRequest);
    expect(service.currentAndSelectedEventTime).toHaveBeenCalledWith(false);
    expect(productService.product.layoutProducts.multiFeedType).toBe(mockTsMft);
    expect(JSON.stringify(service.eventDetails.events)).toEqual(JSON.stringify(mockEvents));
    expect(resultService.resultsUtils.nextEventNumber).toBe(mockFirstEvId);
    expect(resultService.resultsUtils.nextEventDuration).toBe(mockFirstEvDuration);
  });

  it('getRanking() should be get ranking data', async () => {
    const mockTournamentId = 123;
    spyOn(elysApiService.virtual, 'getRanking').and.callThrough();
    service.currentProductDetails = mockVirtualBetTournamentExtended;
    await service.getRanking(mockTournamentId).then((data) => {
      expect(data).toEqual(mockVirtualGetRankByEventResponse)
    });
    expect(elysApiService.virtual.getRanking).toHaveBeenCalledWith(mockTournamentId)
  });

});