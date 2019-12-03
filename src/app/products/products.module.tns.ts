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
import { BetoddsComponent } from './product-dialog/betodds/betodds.component';
import { StatisticsComponent } from './product-dialog/statistics/statistics.component';
import { CockFightComponent as CockFightStatisticsComponent } from './product-dialog/statistics/templates/cock-fight/cock-fight.component';
import { RaceComponent as RaceStatisticsComponent } from './product-dialog/statistics/templates/race/race.component';
import { SoccerComponent as SoccerStatisticsComponent } from './product-dialog/statistics/templates/soccer/soccer.component';
import { HotAndColdComponent } from './product-dialog/hot-and-cold/hot-and-cold.component';
import { KenoComponent as KenoHotAndColdComponent } from './product-dialog/hot-and-cold/template/keno/keno.component';
import { PaytableComponent } from './product-dialog/paytable/paytable.component';
import { KenoComponent as KenoPaytableComponent } from './product-dialog/paytable/template/keno/keno.component';
import { RankingComponent } from './product-dialog/ranking/ranking.component';
import { SoccerComponent as SoccerRankingComponent } from './product-dialog/ranking/templates/soccer/soccer.component';


@NgModule({
  declarations: [
    ProductsComponent,
    WidgetComponent,
    BtncalcComponent,
    DisplayComponent,
    AdvanceGameComponent,
    CouponComponent,
    PayCancelDialogComponent,
    ProductDialogComponent,
    BetoddsComponent,
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
    SharedModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule { }
