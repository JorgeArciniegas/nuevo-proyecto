import { Injectable } from '@angular/core';
import { DialogData } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public showDialog = false;
  public dialogData: DialogData;

  constructor() {}

  openDialog(dialogData: DialogData) {
    this.dialogData = dialogData;
    this.showDialog = true;
  }
  closeDialog(): void {
    this.showDialog = false;
  }
}
