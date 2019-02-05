import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../app.settings';
import { ProductsService } from '../products.service';
import { Lucky } from './dogracing.models';
import { DogracingService } from './dogracing.service';

@Component({
  selector: 'app-dogracing',
  templateUrl: './dogracing.component.html',
  styleUrls: ['./dogracing.component.scss']
})
export class DogracingComponent implements OnInit {
  public rowHeight: number;
  lucky: typeof Lucky = Lucky;
  public settings: AppSettings;

  // Lucky last random extract
  oldLucky: string;

  constructor(
    private route: ActivatedRoute,
    public service: ProductsService,
    public dogracingService: DogracingService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
    service.productNameSelectedSubscribe.next(route.snapshot.data.productName);
  }

  ngOnInit() {
    this.rowHeight = (this.service.windowSize.columnHeight - 20 - 17) / 18;
  }

  placingLucky(lucky: Lucky): void {
    this.dogracingService.resetPlayRacing();
    let n = '';
    // extract  lucky
    for (let i = 1; i <= lucky; i++) {
      while (true) {
        // check if extract exist
        const extTemp: number = this.dogracingService.RNGLucky2(i);
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
        this.dogracingService.RNGLuckyPlacing(parseInt(element, 10), i + 1);
      }
    } else {
      this.placingLucky(lucky);
    }
  }
}
