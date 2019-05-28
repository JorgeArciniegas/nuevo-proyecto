import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../app.settings';
import { DialogService } from '../dialog.service';
import { ProductsService } from '../products.service';
import { Lucky } from './racing.models';
import { RacingService } from './racing.service';

@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styleUrls: ['./racing.component.scss']
})
export class RacingComponent implements OnInit {
  public rowHeight: number;
  lucky: typeof Lucky = Lucky;
  public settings: AppSettings;

  // Lucky last random extract
  oldLucky: string;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductsService,
    public racingService: RacingService,
    public dialog: DialogService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.rowHeight = (this.productService.windowSize.columnHeight - 20 - 17) / 18;
  }

  placingLucky(lucky: Lucky): void {
    this.racingService.resetPlayRacing();
    let n = '';
    // extract  lucky
    for (let i = 1; i <= lucky; i++) {
      while (true) {
        // check if extract exist
        const extTemp: number = this.racingService.RNGLucky2(i);
        if (n.indexOf(extTemp.toString()) === -1) {
          n += extTemp;
          break;
        }
      }
    }
    // if the selection is not equals to oldLucky selected place bet
    if (n !== this.oldLucky || this.oldLucky === undefined) {
      // save the temporary selection
      this.oldLucky = n;
      for (let i = 0; i < n.length; i++) {
        const element = n.charAt(i);
        this.racingService.RNGLuckyPlacing(parseInt(element, 10), i + 1);
      }
    } else {
      this.placingLucky(lucky);
    }
  }
}