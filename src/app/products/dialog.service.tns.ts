import { Injectable } from '@angular/core';
import { DialogData } from './products.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public showDialog = false;
  public dialogData: DialogData;

  constructor(private userservice: UserService) {}

  openDialog(dialogData: DialogData) {
    this.userservice.isModalOpen = true;
    this.dialogData = dialogData;
    this.showDialog = true;
  }
  closeDialog(): void {
    this.showDialog = false;
    this.userservice.isModalOpen = true;
  }
}
