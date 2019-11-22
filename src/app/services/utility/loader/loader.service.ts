import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OperationData {
  name: string;
  currentOperation?: string;
  isLoading: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  queueOperation = [];
  public isLoading = new BehaviorSubject(false);
  // only use this variable on loading odd from playble board
  private _operationDataDetailOdds: OperationData;
  public get operationDataDetailOdds(): OperationData {
    return this._operationDataDetailOdds;
  }
  public set operationDataDetailOdds(value: OperationData) {
    this._operationDataDetailOdds = value;
  }

  constructor() { }

  setLoading(actived: boolean, operation: string) {
    const checkOperationIndex = (op) => op === operation;
    const indexOperationOnQueue = this.queueOperation.findIndex(checkOperationIndex);
    if (indexOperationOnQueue !== -1 && actived) {
      return;
    }

    if (this.operationDataDetailOdds) {
      this.operationDataDetailOdds.currentOperation = operation;
    }
    if (operation.indexOf('detail') !== -1) {
      this.operationDataDetailOdds = { name: 'detail', currentOperation: operation, isLoading: actived };
    }
    if (!this.isLoading.getValue() && actived) {
      this.isLoading.next(true);
      this.queueOperation = [];
      this.queueOperation.push(operation);
    } else if (this.isLoading.getValue() && !actived) {

      this.queueOperation.splice(indexOperationOnQueue);
      this.isLoading.next(false);

    }
  }

}
