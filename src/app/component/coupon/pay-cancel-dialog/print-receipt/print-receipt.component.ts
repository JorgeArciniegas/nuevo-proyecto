import { Component, OnInit } from '@angular/core';
import { Receipt } from './print-receipt.model';
import { PrintReceiptService } from './print-receipt.service';
import { AppSettings } from '../../../../app.settings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.scss']
})
export class PrintReceiptComponent implements OnInit {
  public receipt: Receipt;
  public date: Date;

  constructor(
    private printService: PrintReceiptService,
    public appSettings: AppSettings,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.receipt = this.printService.receipt;
    this.date = new Date();
  }
}
