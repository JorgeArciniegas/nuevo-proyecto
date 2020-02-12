import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../../../products/dialog.service';
import { ColoursCommonComponent } from './colours-common.component';

@Component({
  selector: 'app-paytable-colours',
  templateUrl: './colours.component.html',
  styleUrls: ['./colours.component.scss']
})
export class ColoursComponent extends ColoursCommonComponent implements OnInit {

  constructor(private dialog: DialogService) {
    super();
  }

  close(): void {
    this.dialog.closeDialog();
  }

  ngOnInit() {
    this.filterPayout();
  }

}
