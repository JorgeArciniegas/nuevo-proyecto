import { Component, OnInit, } from '@angular/core';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { RouterService } from '../../../../services/utility/router/router.service';
import { StatementVirtualShopService } from '../statement-virtual-shop.service';
import { AppSettings } from '../../../../app.settings';
import { timer } from 'rxjs';
import { LoaderService } from '../../../../services/utility/loader/loader.service';

@Component({
  selector: 'app-statement-virtual-shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public service: StatementVirtualShopService,
    private router: RouterService,
    public settings: AppSettings,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
    timer(300).subscribe(() =>
      this.loaderService.setLoading(false, 'ChildrenAdmin')
    );
  }

  getData(): void {
    this.service.getData();
    this.router.getRouter().navigateByUrl('admin/reports/statement-vitual-shop/result');
  }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();
    const today = new Date();
    today.setDate(today.getDate() - 1);

    picker.pickDate({ maxDate: today }).then(result => {
      this.service[key] = new Date(result.year, result.month - 1, result.day);
    });
  }
}
