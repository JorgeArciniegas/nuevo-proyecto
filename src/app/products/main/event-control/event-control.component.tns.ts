import { Component, OnInit } from '@angular/core';
import { LAYOUT_TYPE, Products } from '../../../../environments/environment.models';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../products.service';
import { EventInfo } from '../main.models';
import { MainService } from '../main.service';
import { timer, Subscription } from 'rxjs';
import { LoaderService } from '../../../services/utility/loader/loader.service';

@Component({
  moduleId: module.id,
  selector: 'app-event-control, [app-event-control]',
  templateUrl: './event-control.component.html',
  styleUrls: ['./event-control.component.scss']
})
export class EventControlComponent implements OnInit {
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  private _typeProductSelected: LAYOUT_TYPE;
  public get typeProductSelected(): LAYOUT_TYPE {
    return this.productService.product.layoutProducts.type;
  }
  public set typeProductSelected(value: LAYOUT_TYPE) {
    this._typeProductSelected = value;
  }

  public get product(): Products {
    return this.settings.products.find(product => product.productSelected);
  }

  public get productImageClass(): string {
    return this.product ? 'PRODUCT-' + this.product.codeProduct + '-BG' : '';
  }

  public get isWindowSizeSmall(): boolean {
    return this.productService.windowSize.small;
  }

  public get showEventId(): boolean {
    return this.settings.showEventId;
  }


  public get currentEventDetail(): EventInfo {
    return this.mainService.eventDetails.events[this.mainService.eventDetails.currentEvent];
  }
  constructor(
    private mainService: MainService,
    private productService: ProductsService,
    private settings: AppSettings,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    timer().subscribe(() => {
      this.productService.resetBoard();
    });

  }

}
