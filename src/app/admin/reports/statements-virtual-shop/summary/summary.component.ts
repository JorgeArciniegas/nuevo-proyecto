import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { StatementVirtualShopService } from '../statement-virtual-shop.service';
import { RouterService } from '../../../../services/utility/router/router.service.tns';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  constructor(public userService: UserService, public service: StatementVirtualShopService) { }

  previusPage() {
    if (this.service.aggregatesData.actualPages <= 0) {
      return;
    }
    this.service.aggregatesData.actualPages--;
    this.service.filterOperators();
  }


  nextPage() {
    if (this.service.aggregatesData.actualPages >= this.service.aggregatesData.totalPages - 1) {
      return;
    }
    this.service.aggregatesData.actualPages++;
    this.service.filterOperators();
  }

  /**
   *
   */
  exportData(): void {
    this.service.exportData();
  }

}
