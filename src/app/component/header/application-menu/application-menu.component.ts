import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../../../../../src/environments/environment.models';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { IconSize } from '../../model/iconSize.model';
import { RouterService } from '../../../services/utility/router/router.service';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements AfterViewInit {
  public settings: AppSettings;
  public logoIcon: IconSize;
  public menuIcon: IconSize;
  public buttonIcon: IconSize;
  public btnSelected: string;

  constructor(
    private readonly appSettings: AppSettings,
    public productService: ProductsService,
    private router: RouterService
  ) {
    this.settings = appSettings;
  }

  ngAfterViewInit() {
    let barHeight =
      this.productService.windowSize.height -
      this.productService.windowSize.columnHeight;
    if (barHeight < 10) {
      barHeight = 50;
    }
    this.logoIcon = new IconSize(barHeight * 0.9);
    this.menuIcon = new IconSize(barHeight * 0.7);
    this.buttonIcon = new IconSize(barHeight * 0.8 - 4, barHeight * 0.8);
    this.btnSelected = this.settings.products[0].name;
  }

  /**
   *
   * @param productSelected
   * Reset the playboard and changed the product
   */
  productSelecting(productSelected: Products) {
    /* this.productService.resetBoard(); */
    this.productService.changeProduct(productSelected.codeProduct);
    this.router.getRouter().navigateByUrl('/products/main');
  }
}
