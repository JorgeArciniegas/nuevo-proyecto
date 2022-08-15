import { TestBed } from "@angular/core/testing";
import { ElysStorageLibService } from "@elys/elys-storage-lib";
import { StorageService } from "./storage.service";

class ElysStorageLibServiceStub {
  private elysStore: any = {};

  getData(key: string): any {
    return key in this.elysStore ? this.elysStore[key] : null;
  }

  setData(key: string, value: any): void {
    this.elysStore[key] = value;
  }

  checkIsExist(key: string): boolean {
    return key in this.elysStore;
  }

  destroy(): void {
    this.elysStore = {};
  }

  removeItems(keys: string | string[]): void {
    if(Array.isArray(keys)) {
      keys.forEach(key => {
        delete this.elysStore[key];
      });
    } else {
      delete this.elysStore[keys];
    }
  }

  checkDataIsValid(key: string): boolean {
    return (typeof this.elysStore[key] === 'undefined' || this.elysStore[key] === null) ? false : true;
  }
}

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: ElysStorageLibService, useClass: ElysStorageLibServiceStub }
      ],
    });

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when trying to get unexisting data', () => {
    const key: string = 'userData';
    const result: any = service.getData(key);
    expect(result).toEqual(null);
  });

  it('should set and get data from ElysStorage', () => {
    const key: string = 'userData';
    const userData: any = {
      name: 'Test User',
      profession: 'Developer'
    };

    service.setData(key, userData);
    const result = service.getData(key);

    expect(result).toEqual(userData);
  });


  it('should check if data exist in ElysStorage', () => {
    const key: string = 'token';
    const token: string = 'token string';
    let result: boolean;

    result = service.checkIfExist(key);
    expect(result).toEqual(false);

    service.setData(key, token);
    result = service.checkIfExist(key);
    expect(result).toEqual(true);
  });

  it('should destroy ElysStorage', () => {
    const key1: string = '1';
    const data1: string = 'data';

    const key2: string = '2';
    const data2: string = 'data';

    service.setData(key1, data1);
    service.setData(key2, data2);

    service.destroy();

    expect(service.getData(key1)).toEqual(null);
    expect(service.getData(key2)).toEqual(null);
  });

  it('should remove list of items from ElysStorage', () => {
    const key1: string = '1';
    const data1: string = 'data1';

    const key2: string = '2';
    const data2: string = 'data2';

    const key3: string = '3';
    const data3: string = 'data3';

    service.setData(key1, data1);
    service.setData(key2, data2);
    service.setData(key3, data3);

    service.removeItems(key1, key3);

    expect(service.getData(key1)).toEqual(null);
    expect(service.getData(key2)).toEqual(data2);
    expect(service.getData(key3)).toEqual(null);
  });

  it('should check if data in ElysStorage is valid', () => {
    const key: string = 'testKey';
    const data: string = 'Test Data';
    let result: boolean;

    result = service.checkDataIsValid(key);
    expect(result).toEqual(false);

    service.setData(key, null);
    result = service.checkDataIsValid(key);
    expect(result).toEqual(false);

    service.setData(key, data);
    result = service.checkDataIsValid(key);
    expect(result).toEqual(true);
  });


});
