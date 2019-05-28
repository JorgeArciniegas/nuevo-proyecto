import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../../../../../src/environments/environment.models';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { IconSize } from '../../model/iconSize.model';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {
  public settings: AppSettings;
  public logoIcon: IconSize;
  public menuIcon: IconSize;
  public buttonIcon: IconSize;
  public btnSelected: string;

  constructor(
    private readonly appSettings: AppSettings,
    public productService: ProductsService,
    private router: Router
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
   const barHeight =
        this.productService.windowSize.height -
        this.productService.windowSize.columnHeight;
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
    this.productService.resetBoard();
    this.productService.changeProduct(productSelected.codeProduct);
    this.router.navigateByUrl('/products/racing');
  }
}
