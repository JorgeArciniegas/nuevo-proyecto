import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { BtncalcComponent } from '../component/btncalc/btncalc.component';
import { ConfirmDestroyCouponComponent } from '../component/coupon/confirm-destroy-coupon/confirm-destroy-coupon.component';
import { CouponDialogService } from '../component/coupon/coupon-dialog.service';
import { CouponComponent } from '../component/coupon/coupon.component';
import { PayCancelDialogComponent } from '../component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { DisplayComponent } from '../component/display/display.component';
import { LabelByGroupingPipe } from '../component/pipe/label-by-grouping.pipe';
import { WidgetComponent } from '../component/widget/widget.component';
import { BetoddsComponent } from '../products/product-dialog/betodds/betodds.component';
import { HotAndColdComponent } from '../products/product-dialog/hot-and-cold/hot-and-cold.component';
import { KenoComponent as KenoHotAndColdComponent } from '../products/product-dialog/hot-and-cold/template/keno/keno.component';
import { ColorsComponent as ColorsHotAndColdComponent } from '../products/product-dialog/hot-and-cold/template/colors/colors.component';
import { PaytableComponent } from '../products/product-dialog/paytable/paytable.component';
import { ColoursComponent as ColoursPaytableComponent } from '../products/product-dialog/paytable/template/colours/colours.component';
import { KenoComponent as KenoPaytableComponent } from '../products/product-dialog/paytable/template/keno/keno.component';
import { ProductDialogComponent } from '../products/product-dialog/product-dialog.component';
import { RankingComponent } from '../products/product-dialog/ranking/ranking.component';
import { SoccerComponent as SoccerRankingComponent } from '../products/product-dialog/ranking/templates/soccer/soccer.component';
import { StatisticsComponent } from '../products/product-dialog/statistics/statistics.component';
import { CockFightComponent as CockFightStatisticsComponent } from '../products/product-dialog/statistics/templates/cock-fight/cock-fight.component';
import { RaceComponent as RaceStatisticsComponent } from '../products/product-dialog/statistics/templates/race/race.component';
import { SoccerComponent as SoccerStatisticsComponent } from '../products/product-dialog/statistics/templates/soccer/soccer.component';
import { SharedModule } from '../shared/shared.module';
import { AdvanceGameComponent } from './advance-game/advance-game.component';
import { MainService } from './main/main.service';
import { GroupingsComponent } from './product-dialog/groupings/groupings.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
@NgModule({
  declarations: [
    ProductDialogComponent,
    BetoddsComponent,
    ProductsComponent,
    WidgetComponent,
    BtncalcComponent,
    DisplayComponent,
    AdvanceGameComponent,
    CouponComponent,
    PayCancelDialogComponent,
    StatisticsComponent,
    RaceStatisticsComponent,
    CockFightStatisticsComponent,
    SoccerStatisticsComponent,
    PaytableComponent,
    RankingComponent,
    SoccerRankingComponent,
    KenoPaytableComponent,
    ColoursPaytableComponent,
    HotAndColdComponent,
    KenoHotAndColdComponent,
    ConfirmDestroyCouponComponent,
    GroupingsComponent,
    LabelByGroupingPipe,
    ColorsHotAndColdComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NativeScriptFormsModule
  ],
  providers: [MainService, CouponDialogService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule { }
