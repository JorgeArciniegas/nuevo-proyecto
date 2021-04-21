import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../services/utility/router/router.service';
import { VboxService } from './vbox.service';
import { LoaderService } from '../../../services/utility/loader/loader.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-vbox',
  templateUrl: './vbox.component.html',
  styleUrls: ['./vbox.component.scss']
})
export class VboxComponent implements OnInit {

  constructor(public vboxService: VboxService, private router: RouterService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.vboxService.getList();
    timer(300).subscribe(() =>
      this.loaderService.setLoading(false, 'ChildrenAdmin')
    );
  }

  /**
   *
   */
  previusPage() {
    if (this.vboxService.listVbox.actualPages <= 0) {
      return;
    }
    this.vboxService.listVbox.actualPages--;
    this.vboxService.filterOperators();
  }


  nextPage() {
    if (this.vboxService.listVbox.actualPages >= this.vboxService.listVbox.totalPages - 1) {
      return;
    }
    this.vboxService.listVbox.actualPages++;
    this.vboxService.filterOperators();
  }


  editing(idx: number) {
    this.vboxService.vBoxSelected = this.vboxService.listTempVbox[idx];
    this.vboxService.vBoxSelected.vBoxMonitorSelectedIdx = 0;
    this.router.getRouter().navigate(['./admin/vbox/edit']);
  }
}
