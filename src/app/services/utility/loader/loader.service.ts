import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  queueOperation = [];
  public isLoading = new BehaviorSubject(false);
  constructor() { }


  setLoading(actived: boolean, operation: string) {
    const checkOperationIndex = (op) => op === operation;
    const indexOperationOnQueue = this.queueOperation.findIndex(checkOperationIndex);

    if (indexOperationOnQueue !== -1 && actived) {
      return;
    }
    // console.log('SET LOADING --->', checkOperationIndex, indexOperationOnQueue, actived, operation, this.queueOperation);
    if (!this.isLoading.getValue() && actived) {
      this.isLoading.next(actived);
      this.queueOperation.push(operation);
    } else {
      this.queueOperation.splice(indexOperationOnQueue);
      this.isLoading.next(actived);
    }
  }



}
