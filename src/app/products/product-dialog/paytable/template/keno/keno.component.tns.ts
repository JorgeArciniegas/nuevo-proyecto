import { Component, Input } from '@angular/core';
import { DialogService } from '../../../../../products/dialog.service';
import { BetDataDialog } from '../../../../../products/products.model';

@Component({
  selector: 'app-paytable-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent {
  @Input()
  data: BetDataDialog;
  selectedNumbers = 10;

  constructor(private dialog: DialogService) { }

  close(): void {
    this.dialog.closeDialog();
  }
}
