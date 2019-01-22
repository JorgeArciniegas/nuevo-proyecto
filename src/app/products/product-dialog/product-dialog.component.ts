import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BetOdds, DialogData } from '../products.model';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  public column: number;
  public betOdds: BetOdds;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.betOdds = data.data;
    if (data.breakpoint < 6) {
      this.column = 2;
    } else if (data.breakpoint === 6) {
      this.column = 3;
    } else {
      this.column = 4;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
