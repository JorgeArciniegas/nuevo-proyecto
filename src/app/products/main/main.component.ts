import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../app.settings';
import { DialogService } from '../dialog.service';
import { ProductsService } from '../products.service';
import { MainService } from './main.service';
import { UserService } from '../../../../src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public rowHeight: number;
  public settings: AppSettings;

  // Lucky last random extract
  oldLucky: string;

  /**
  * listen for tab focus changes for web environment and update event timer
  * */
  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    console.log(event);
    this.mainService.currentAndSelectedEventTime();
  }

  constructor(
    private route: ActivatedRoute,
    public productService: ProductsService,
    public mainService: MainService,
    public dialog: DialogService,
    private userService: UserService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.rowHeight =
      (this.productService.windowSize.columnHeight - 30 - 12) / 24;
  }
}
