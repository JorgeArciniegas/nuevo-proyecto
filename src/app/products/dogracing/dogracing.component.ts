import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private route: ActivatedRoute,
    public service: ProductsService,
    public dogracingService: DogracingService,
    public sanitizer: DomSanitizer
  ) {
    service.productNameSelectedSubscribe.next(route.snapshot.data.productName);
  }

  ngOnInit() {
    this.rowHeight = (this.service.windowSize.columnHeight - 20 - 17) / 18;
  }

  placingLucky(lucky: Lucky): void {
    this.dogracingService.RNGLucky(lucky);
  }
}
