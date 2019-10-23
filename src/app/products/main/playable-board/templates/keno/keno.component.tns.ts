import { Component, OnInit, Input } from '@angular/core';
import { KenoNumber } from './keno-number';

@Component({
  selector: 'app-playable-board-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent implements OnInit {
  @Input()
  public rowHeight: number;
  kenoTable: KenoNumber[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.initKenoNumbers();
  }

  onNumberClick(kenoNumber: KenoNumber): void {
    kenoNumber.isSelected = !kenoNumber.isSelected;
  }

  private initKenoNumbers(): void {
    let currentNumber = 1;
    for (let i = 0; i < 8; ++i) {
      for (let j = 0; j < 10; ++j) {
        const kenoNumber: KenoNumber = {
          number: currentNumber,
          isSelected: false
        };
        ++currentNumber;
        if (!this.kenoTable[i]) {
          this.kenoTable[i] = [];
        }
        this.kenoTable[i][j] = kenoNumber;
      }
    }
  }
}
