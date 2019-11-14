import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { ProductsService } from '../../../products/products.service';
import { Products } from '../../../../environments/environment.models';
import { UserService } from '../../../services/user.service';
import { RouterService } from '../../../services/utility/router/router.service';
import { LoaderService } from '../../../services/utility/loader/loader.service';
import { timer } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-application-menu, [app-application-menu]',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.scss']
})
export class ApplicationMenuComponent implements OnInit {
  public settings: AppSettings;
  public btnSelected: string;

  constructor(
    public readonly appSettings: AppSettings,
    public productService: ProductsService,
    private router: RouterService,
    public readonly userService: UserService,
    private loaderService: LoaderService
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.btnSelected = this.settings.products[0].name;
  }

  productSelecting(productSelected: Products) {
    this.btnSelected = productSelected.name;
    this.loaderService.isLoading.next(true);
    timer(100).subscribe(() => {
      // this.productService.resetBoard();
      this.productService.changeProduct(productSelected.codeProduct);
      this.router.getRouter().navigateByUrl('/products/main');
    });
  }

  goToAdmin() {
    this.loaderService.isLoading.next(true);
    timer(100).subscribe(() => this.router.getRouter().navigateByUrl('/admin'));

  }
}
