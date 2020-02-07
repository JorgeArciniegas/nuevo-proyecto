import { Component, Input, OnInit } from '@angular/core';
import { LotteryPayoutMarket, LotteryPayoutSelection } from '@elys/elys-api';
import { ColourGameId } from '../../../../main/colour-game.enum';
import { BetDataDialog } from '../../../../products.model';

@Component({
  selector: 'app-paytable-colours',
  templateUrl: './colours.component.html',
  styleUrls: ['./colours.component.scss']
})
export class ColoursComponent implements OnInit {
  @Input()
  data: BetDataDialog;

  public gameSelections: LotteryPayoutSelection[];
  constructor() { }

  ngOnInit() {
    let payouts: LotteryPayoutMarket[];
    switch (ColourGameId[this.data.paytable.market]) {
      case ColourGameId.bet49:
        payouts = this.data.paytable.payouts.filter(
          p => p.MasterMarketName === 'Bet49'
        );
        this.gameSelections = payouts.find(p => p.MappingCount === this.data.paytable.selectionNumber).Selections;
        break;
      case ColourGameId.hilo:
        payouts = this.data.paytable.payouts.filter(
          p => p.MasterMarketName === 'Hi Mid Lo'
        );
        this.gameSelections = payouts[0].Selections;
        break;
      default:
        break;
    }


  }

}
