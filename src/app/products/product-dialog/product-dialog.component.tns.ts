import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { DialogService } from '../dialog.service';
import { BetOdd, DialogData } from '../products.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  @Input()
  private data: DialogData;

  public settings: AppSettings;
  private rowNumber = 3;
  public columnNumber = 3;
  private maxItems = 0;
  public page = 0;
  public maxPage = 0;
  public columns = '';
  public rows = '';
  public title: string;
  public betOdds: BetOdd[];
  public emptyOdds: string[] = [];

  constructor(
    private dialog: DialogService,
    private productService: ProductsService,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
    if (productService.windowSize.small) {
      this.rowNumber = 2;
    }
  }

  ngOnInit(): void {
    this.title = this.data.betOdds.title;
    for (let index = 0; index < this.columnNumber - 1; index++) {
      this.columns += ',*';
    }
    for (let index = 0; index < this.rowNumber; index++) {
      this.rows += ',5*';
    }
    this.maxItems = this.rowNumber * this.columnNumber;
    this.maxPage = Math.ceil(this.data.betOdds.odds.length / this.maxItems);
    this.filterOdds();
  }

  filterOdds() {
    const start = this.page * this.maxItems;
    let end = (this.page + 1) * this.maxItems;
    if (end > this.data.betOdds.odds.length) {
      end = this.data.betOdds.odds.length;
    }
    this.betOdds = this.data.betOdds.odds.slice(start, end);

    if (this.page === this.maxPage - 1) {
      for (
        let index = 0;
        index < this.maxItems - this.betOdds.length;
        index++
      ) {
        this.emptyOdds.push('');
      }
    } else {
      this.emptyOdds = [];
    }
  }

  previusOdds() {
    if (this.page <= 0) {
      return;
    }
    this.page--;
    this.filterOdds();
  }

  nextOdds() {
    if (this.page >= this.maxPage - 1) {
      return;
    }
    this.page++;
    this.filterOdds();
  }

  toggleOdd(odd: BetOdd) {
    odd.selected = !odd.selected;
  }

  close(): void {
    this.dialog.showDialog = false;
  }
}
