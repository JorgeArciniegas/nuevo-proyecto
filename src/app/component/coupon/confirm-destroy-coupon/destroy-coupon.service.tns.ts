import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserService } from '../../../../../src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DestroyCouponService {
  public showDialog = false;
  public confirmDestroySub: Subject<boolean>;
  public confirmDestroyObs: Observable<boolean>;
  constructor(public userService: UserService) {
    this.confirmDestroySub = new Subject();
    this.confirmDestroyObs = this.confirmDestroySub.asObservable();
  }

  openDestroyCouponDialog() {
    this.userService.isModalOpen = true;
    this.userService.isBtnCalcEditable = false;
    this.showDialog = true;
    console.log('openDestroyCouponDialog');
  }

  closeDialog() {
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
    this.showDialog = false;
  }

  selectedOperation(sel: boolean): void {
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
    this.confirmDestroySub.next(sel);
  }
}
