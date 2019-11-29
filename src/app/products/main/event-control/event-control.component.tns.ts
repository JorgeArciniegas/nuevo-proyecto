import { Component } from '@angular/core';
import { LAYOUT_TYPE, Products } from '../../../../environments/environment.models';
import { AppSettings } from '../../../app.settings';
import { LoaderService } from '../../../services/utility/loader/loader.service';
import { ProductsService } from '../../products.service';
import { EventInfo } from '../main.models';
import { MainService } from '../main.service';

@Component({
  moduleId: module.id,
  selector: 'app-event-control, [app-event-control]',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent {
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  private _typeProductSelected: LAYOUT_TYPE;
  public get typeProductSelected(): LAYOUT_TYPE {
    return this._typeProductSelected;
  }
  public set typeProductSelected(value: LAYOUT_TYPE) {
    this._typeProductSelected = value;
  }

  public get product(): Products {
    return this.settings.products.find(product => product.productSelected);
  }

  public productImageClass: string;
  public isWindowSizeSmall: boolean;
  public showEventId: boolean;

  public get currentEventDetail(): EventInfo {
    return this.mainService.eventDetails.events[this.mainService.eventDetails.currentEvent];
  }


  constructor(
    private mainService: MainService,
    private productService: ProductsService,
    private settings: AppSettings,
    private loaderService: LoaderService
  ) {
    this.productService.resetBoard();
    this.isWindowSizeSmall = this.productService.windowSize.small;
    this.showEventId = this.settings.showEventId;
    this.productImageClass = this.product ? 'PRODUCT-' + this.product.codeProduct + '-BG' : '';
    this.typeProductSelected = this.product.layoutProducts.type;
  }

}
