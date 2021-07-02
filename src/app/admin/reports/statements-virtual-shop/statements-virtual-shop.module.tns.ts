import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { StatementVirtualShopService } from './statement-virtual-shop.service';
import { StatementsVirtualShopRoutingModule } from './statements-virtual-shop-routing.module';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [SearchComponent, SummaryComponent],
  imports: [
    CommonModule,
    StatementsVirtualShopRoutingModule,
    SharedModule,
    MatNativeDateModule
  ],
  providers: [StatementVirtualShopService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class StatementsVirtualShopModule { }
