import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDatetimepicker } from 'nativescript-modal-datetimepicker';
import { RouterService } from '../../../../services/utility/router/router.service';
import { StatementVirtualShopService } from '../statement-virtual-shop.service';
import { AppSettings } from '../../../../app.settings';

@Component({
  selector: 'app-statement-virtual-shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('pickerDateFrom') private inputPickerDateFrom;
  @ViewChild('pickerDateTo') private inputPickerDateTo;

  constructor(
    public service: StatementVirtualShopService,
    private router: RouterService,
    public settings: AppSettings
  ) {

  }


  getData(): void {
    this.service.getData();
    this.router.getRouter().navigateByUrl('admin/reports/statement-vitual-shop/result');
  }

  selectDate(key: string): void {
    const picker = new ModalDatetimepicker();

    picker.pickDate().then(result => {
      this.service[key] = new Date(result.year, result.month - 1, result.day);
    });
  }
}
