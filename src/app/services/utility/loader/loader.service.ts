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
    if (!this.isLoading.getValue() && actived) {
      this.isLoading.next(true);
      this.queueOperation = [];
      this.queueOperation.push(operation);
    } else {
      this.queueOperation.splice(indexOperationOnQueue);
      this.isLoading.next(false);
    }
  }

}
