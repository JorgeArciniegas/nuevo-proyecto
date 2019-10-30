import { Component, Input } from '@angular/core';
import { BetDataDialog } from 'src/app/products/products.model';
import { DialogService } from 'src/app/products/dialog.service';

@Component({
  selector: 'app-hot-and-cold-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent {
  @Input()
  data: BetDataDialog;

  constructor(private dialog: DialogService) { }

  close(): void {
    this.dialog.closeDialog();
  }

}
