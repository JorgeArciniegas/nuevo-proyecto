import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UserService } from '../../../../../src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DestroyCouponService {
  public showDialog = false;
  private subProduct: boolean;
  public confirmDestroySub: Subject<boolean>;
  public confirmDestroyObs: Observable<boolean>;
  public confirmDestroySubProductSub: Subject<boolean>;
  constructor(public userService: UserService) {
    this.confirmDestroySub = new Subject();
    this.confirmDestroyObs = this.confirmDestroySub.asObservable();
    this.confirmDestroySubProductSub = new Subject();
  }

  openDestroyCouponDialog(subProduct: boolean = false) {
    this.userService.isModalOpen = true;
    this.userService.isBtnCalcEditable = false;
    this.showDialog = true;
    this.subProduct = subProduct;
  }

  closeDialog() {
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
    this.showDialog = false;
  }

  selectedOperation(sel: boolean): void {
    this.userService.isModalOpen = false;
    this.userService.isBtnCalcEditable = true;
    if (this.subProduct) {
      this.confirmDestroySubProductSub.next(sel);
    } else {
      this.confirmDestroySub.next(sel);
    }
  }

  getConfirmDestroySubProductObs(): Observable<boolean> {
    return this.confirmDestroySubProductSub.asObservable();
  }
}
