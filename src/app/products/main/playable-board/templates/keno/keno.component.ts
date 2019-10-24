import { Component, OnInit, Input } from '@angular/core';
import { KenoNumber } from './keno.model';
import { MainService } from '../../../main.service';
import { BtncalcService } from '../../../../../component/btncalc/btncalc.service';

@Component({
  selector: 'app-playable-board-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss']
})
export class KenoComponent implements OnInit {
  @Input()
  public rowHeight: number;
  kenoTable: KenoNumber[] = [];

  constructor(private mainService: MainService, private btnCalcService: BtncalcService) { }

  ngOnInit(): void {
    this.initKenoNumbers();
  }

  onNumberClick(kenoNumber: KenoNumber): void {
    kenoNumber.isSelected = !kenoNumber.isSelected;
    this.mainService.placingNumber(kenoNumber);
    this.btnCalcService.tapPlus();
  }

  private initKenoNumbers(): void {
    const kenoNumbers: KenoNumber[] = [];
    for (let i = 1; i <= 80; ++i) {
      const kenoNumber: KenoNumber = {
        number: i,
        isSelected: false
      };
      kenoNumbers.push(kenoNumber);
    }
    this.kenoTable = kenoNumbers;
  }
}
