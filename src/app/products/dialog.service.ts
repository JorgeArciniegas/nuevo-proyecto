import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { DialogData } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogProductRef = null;

  constructor(private dialog: MatDialog) {}

  openDialog(dialogData: DialogData) {
    this.dialogProductRef = this.dialog.open(ProductDialogComponent, {
      data: dialogData
    });
  }

  closeDialog(): void {
    if (this.dialogProductRef != null) {
      this.dialogProductRef.close();
    }
  }
}
