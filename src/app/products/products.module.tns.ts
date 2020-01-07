import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BtncalcComponent } from '../component/btncalc/btncalc.component';
import { CouponComponent } from '../component/coupon/coupon.component';
import { DisplayComponent } from '../component/display/display.component';
import { WidgetComponent } from '../component/widget/widget.component';
import { SharedModule } from '../shared/shared.module';
import { AdvanceGameComponent } from './advance-game/advance-game.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { PayCancelDialogComponent } from '../component/coupon/pay-cancel-dialog/pay-cancel-dialog.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { HotAndColdComponent } from '../products/product-dialog/hot-and-cold/hot-and-cold.component';
import { KenoComponent as KenoHotAndColdComponent } from '../products/product-dialog/hot-and-cold/template/keno/keno.component';
import { PaytableComponent } from '../products/product-dialog/paytable/paytable.component';
import { KenoComponent as KenoPaytableComponent } from '../products/product-dialog/paytable/template/keno/keno.component';
import { RankingComponent } from '../products/product-dialog/ranking/ranking.component';
import { SoccerComponent as SoccerRankingComponent } from '../products/product-dialog/ranking/templates/soccer/soccer.component';
import { StatisticsComponent } from '../products/product-dialog/statistics/statistics.component';
import { CockFightComponent as CockFightStatisticsComponent } from '../products/product-dialog/statistics/templates/cock-fight/cock-fight.component';
import { RaceComponent as RaceStatisticsComponent } from '../products/product-dialog/statistics/templates/race/race.component';
import { SoccerComponent as SoccerStatisticsComponent } from '../products/product-dialog/statistics/templates/soccer/soccer.component';
import { BetoddsComponent } from '../products/product-dialog/betodds/betodds.component';
import { ProductDialogComponent } from '../products/product-dialog/product-dialog.component';
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
    HotAndColdComponent,
    KenoHotAndColdComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule { }
