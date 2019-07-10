import { Component, OnInit, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { Products } from '../../../../../src/environments/environment.models';
import { UserService } from '../../../../../src/app/services/user.service';

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
    private router: RouterExtensions,
    public readonly userService: UserService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.btnSelected = this.settings.products[0].name;
  }

  productSelecting(productSelected: Products) {
    this.btnSelected = productSelected.name;
    this.productService.resetBoard();
    this.productService.changeProduct(productSelected.codeProduct);
    this.router.navigateByUrl('/products/main');
  }
}
