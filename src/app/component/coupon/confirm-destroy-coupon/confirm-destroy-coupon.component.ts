import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DestroyCouponService } from './destroy-coupon.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CouponService } from '../coupon.service';

@Component({
  selector: 'app-confirm-destroy-coupon',
  templateUrl: './confirm-destroy-coupon.component.html',
  styleUrls: ['./confirm-destroy-coupon.component.scss']
})
export class ConfirmDestroyCouponComponent implements OnInit, OnDestroy {


  constructor(
    public dialogRef: MatDialogRef<ConfirmDestroyCouponComponent>
    ) { }

  ngOnInit() {
    this.changeClassApp('modal-center');
  }

  ngOnDestroy(): void {
    this.changeClassApp('modal-center');
  }

  selectedOperation(sel: boolean): void {
    this.dialogRef.close(sel);
  }



  private changeClassApp(newClass: string): void {
    const elem: HTMLElement = document.querySelector('body');

    if (elem.classList.contains(newClass)) {
      elem.classList.remove(newClass);
    } else {
      elem.classList.add(newClass);
    }
  }
}
