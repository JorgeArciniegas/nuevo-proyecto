import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { UserService } from '../../services/user.service';
import { LoaderService } from '../../services/utility/loader/loader.service';
import { DialogService } from '../dialog.service';
import { ProductsService } from '../products.service';
import { MainService } from './main.service';
import { Observable } from 'rxjs';
import { Page, EventData } from 'tns-core-modules/ui/page/page';
import { elementAt } from 'rxjs-compat/operator/elementAt';


@Component({
  moduleId: module.id,
  selector: 'app-main, [app-main]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public rowHeight: number;
  public settings: AppSettings;

  // Lucky last random extract
  oldLucky: string;
  loadedComponent: string[];
  constructor(
    public productService: ProductsService,
    public mainService: MainService,
    public dialog: DialogService,
    public userService: UserService,
    public readonly appSettings: AppSettings,
    public loaderService: LoaderService,
    private element: ElementRef
  ) {
    this.settings = appSettings;
  }
  ngOnInit() {

    this.rowHeight = (this.productService.windowSize.columnHeight - 30 - 12) / 24;
  }

  loaded(args: EventData) {
    /* const page = <Page>this.element.nativeElement;
    Observable.fromEvent(page, 'load').subscribe((e) => { console.log(e); }); */
    console.log(args);
  }
  ngOnDestroy() {
    this.mainService.countdownSub.unsubscribe();
  }
}
