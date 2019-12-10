import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BtncalcComponent } from '../component/btncalc/btncalc.component';
import { CouponComponent } from '../component/coupon/coupon.component';
import { DisplayComponent } from '../component/display/display.component';
import { WidgetComponent } from '../component/widget/widget.component';
import { SharedModule } from '../shared/shared.module';
import { AdvanceGameComponent } from './advance-game/advance-game.component';
import { MainService } from './main/main.service';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    WidgetComponent,
    BtncalcComponent,
    DisplayComponent,
    AdvanceGameComponent,
    CouponComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  providers: [MainService],
  entryComponents: [WidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
