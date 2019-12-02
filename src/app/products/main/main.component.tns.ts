import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventData } from 'tns-core-modules/ui/page/page';
import { AppSettings } from '../../app.settings';
import { UserService } from '../../services/user.service';
import { LoaderService } from '../../services/utility/loader/loader.service';
import { DialogService } from '../dialog.service';
import { ProductsService } from '../products.service';
import { MainService } from './main.service';


@Component({
  moduleId: module.id,
  selector: 'app-main, [app-main]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public rowHeight: number;
  public settings: AppSettings;

  // Lucky last random extract
  oldLucky: string;
  constructor(
    public productService: ProductsService,
    public mainService: MainService,
    public dialog: DialogService,
    public userService: UserService,
    public readonly appSettings: AppSettings,
    public loaderService: LoaderService
  ) {
    this.settings = appSettings;
  }
  ngOnInit() {
    this.rowHeight = (this.productService.windowSize.columnHeight - 30 - 12) / 24;
  }

  loaded(args: EventData) { }
}
