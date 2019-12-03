import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BtncalcComponent } from '../component/btncalc/btncalc.component';
import { CouponComponent } from '../component/coupon/coupon.component';
import { PayCancelDialogComponent } from '../component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { DisplayComponent } from '../component/display/display.component';
import { WidgetComponent } from '../component/widget/widget.component';
import { SharedModule } from '../shared/shared.module';
import { AdvanceGameComponent } from './advance-game/advance-game.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';



@NgModule({
  declarations: [
    ProductsComponent,
    WidgetComponent,
    BtncalcComponent,
    DisplayComponent,
    AdvanceGameComponent,
    CouponComponent,
    PayCancelDialogComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule { }
