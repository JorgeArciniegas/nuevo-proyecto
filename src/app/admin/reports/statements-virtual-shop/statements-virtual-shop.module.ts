import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementsVirtualShopRoutingModule } from './statements-virtual-shop-routing.module';
import { SearchComponent } from './search/search.component';
import { SummaryComponent } from './summary/summary.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [SearchComponent, SummaryComponent],
  imports: [
    CommonModule,
    StatementsVirtualShopRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class StatementsVirtualShopModule { }