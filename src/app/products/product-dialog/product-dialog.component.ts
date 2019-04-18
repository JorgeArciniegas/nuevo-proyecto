import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable as ObservableIdle } from 'rxjs/Rx';
import { AppSettings } from '../../app.settings';
import { BetOdd, DialogData } from '../products.model';
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit, AfterViewInit {
  public settings: AppSettings;
  private rowNumber = 0;
  private maxItems = 0;
  public page = 0;
  public maxPage = 0;
  public containerPaddingTop: number;
  public column: number;
  public title: string;
  public betOdds: BetOdd[];
  public emptyOdds: string[] = [];

  @ViewChild('content') elementView: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    public readonly appSettings: AppSettings
  ) {
    this.settings = appSettings;
    this.title = data.betOdds.title;
    if (data.breakpoint < 6) {
      this.column = 2;
    } else if (data.breakpoint === 6) {
      this.column = 3;
    } else {
      this.column = 4;
    }
  }

  ngOnInit(): void {
    this.rowNumber = Math.floor(
      (this.elementView.nativeElement.offsetHeight - 60) / 105
    );
    this.containerPaddingTop = Math.floor(
      ((this.elementView.nativeElement.offsetHeight - 60) % 105) / 2
    );
    this.maxItems = this.rowNumber * this.column;
    this.maxPage = Math.ceil(this.data.betOdds.odds.length / this.maxItems);
    this.filterOdds();
  }

  ngAfterViewInit(): void {
    ObservableIdle.timer(150)
      .take(1)
      .subscribe(() => {
        this.data.opened = true;
      });
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
    this.dialogRef.close();
    this.data.opened = false;
  }

  /* @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.data.opened) {
      if (!this.elementView.nativeElement.contains(event.target)) {
        this.close();
      }
    }
  } */
}
