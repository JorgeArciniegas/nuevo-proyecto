import { Injectable } from '@angular/core';
import { DialogData } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor() {}

  openDialog(dialogData: DialogData) {}

  closeDialog(): void {}
}
