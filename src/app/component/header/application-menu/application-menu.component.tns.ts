import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {
  public settings: AppSettings;
  public btnSelected: string;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService,
    private router: RouterExtensions
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.btnSelected = this.settings.products[0].name;
  }

  productSelecting(productSelected: string) {
    this.btnSelected = productSelected;
    this.router.navigateByUrl('/products/' + productSelected);
    this.productService.resetBoard();
  }
}
