import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestroyCouponService {

  public showDialog = false;
  public confirmDestroySub: Subject<boolean>;
  public confirmDestroyObs: Observable<boolean>;
  constructor( ) {
    this.confirmDestroySub = new Subject();
    this.confirmDestroyObs = this.confirmDestroySub.asObservable();
  }

  openDestroyCouponDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }


  selectedOperation(sel: boolean): void {
    this.confirmDestroySub.next(sel);
  }
}
