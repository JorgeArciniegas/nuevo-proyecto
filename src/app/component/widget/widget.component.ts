import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { IconSize } from '../model/iconSize.model';
import {
  Products,
  LAYOUT_TYPE
} from '../../../../src/environments/environment.models';
import { ProductsService } from '../../../../src/app/products/products.service';
import { BetDataDialog } from '../../../../src/app/products/products.model';
import { MainService } from '../../products/main/main.service';
import { VirtualBetCompetitor } from '@elys/elys-api/lib/virtual/virtual.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  public settings: AppSettings;

  @Input()
  private rowHeight: number;
  @Input()
  public timeBlocked = false;

  @Input()
  public product: Products;

  public widgetIcon: IconSize;

  constructor(
    public readonly appSettings: AppSettings,
    private productService: ProductsService,
    private mainService: MainService,
    private userService: UserService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.widgetIcon = new IconSize(this.rowHeight * 0.7, this.rowHeight * 0.7);
  }

  /**
   * @argument This method invoke the modal. Before to open it,
   * create the object and append the values loads from the current selected race.
   * @param typeObject
   */
  async openRouting(typeObject: string): Promise<void> {
    let virtualBetCompetitorStatistics: VirtualBetCompetitor[] = [];
    const data: BetDataDialog = { title: typeObject.toUpperCase() };
    if (
      this.productService.product.layoutProducts.type === LAYOUT_TYPE.SOCCER
    ) {
      await this.mainService.getCurrentTournament().then(currentEventDetails => {
        for (const match of currentEventDetails.matches) {
          virtualBetCompetitorStatistics.push(
            match.virtualBetCompetitor[0]
          );
          virtualBetCompetitorStatistics.push(
            match.virtualBetCompetitor[1]
          );
        }
      });
    } else {
      await this.mainService.getCurrentEvent().then(currentEventDetails => {
        virtualBetCompetitorStatistics = currentEventDetails.tm;
      });
    }

    switch (typeObject) {
      case 'statistic':
        data.statistics = {
          codeProduct: this.productService.product.codeProduct,
          virtualBetCompetitor: virtualBetCompetitorStatistics,
          layoutProducts: this.productService.product.layoutProducts.type
        };
        break;
      default:
        data.statistics = null;
    }

    this.productService.openProductDialog(data);
  }
}
