import { Input } from '@angular/core';
import { LotteryPayoutMarket, LotteryPayoutSelection } from '@elys/elys-api';
import { ColourGameId } from '../../../../main/colour-game.enum';
import { BetDataDialog } from '../../../../products.model';

export class ColoursCommonComponent {
    @Input()
    data: BetDataDialog;

    public gameSelections: LotteryPayoutSelection[];

    filterPayout(): void {
        let payouts: LotteryPayoutMarket[];
        switch (ColourGameId[this.data.paytable.market]) {
            case ColourGameId.bet49:
                payouts = this.data.paytable.payouts.filter(
                    p => p.MasterMarketName === 'Bet49'
                );
                this.gameSelections = payouts.find(p =>
                    p.MarketTypeId === this.getMarketTypeId(ColourGameId.bet49, this.data.paytable.selectionNumber)
                ).Selections;
                break;
            case ColourGameId.hilo:
                payouts = this.data.paytable.payouts.filter(
                    p => p.MasterMarketName === 'Hi Mid Lo'
                );
                this.gameSelections = payouts[0].Selections;
                break;
            case ColourGameId.betzero:
                payouts = this.data.paytable.payouts.filter(
                    p => p.MasterMarketName === 'BetZero'
                );
                this.gameSelections = payouts.find(p =>
                    p.MarketTypeId === this.getMarketTypeId(ColourGameId.betzero, this.data.paytable.selectionNumber)
                ).Selections;
                break;
            case ColourGameId.dragon:
                payouts = this.data.paytable.payouts.filter(
                    p => p.MasterMarketName === 'Dragon'
                );
                this.gameSelections = payouts.find(p =>
                    p.MarketTypeId === this.getMarketTypeId(ColourGameId.dragon, this.data.paytable.selectionNumber)
                ).Selections;
                break;
            default:
                break;
        }
    }

    getMarketTypeId(game: ColourGameId, numberOfSelection: number): number {
        switch (game) {
            case ColourGameId.bet49:
                switch (numberOfSelection) {
                    case 1: return 900;
                    case 2: return 901;
                    case 3: return 902;
                    case 4: return 903;
                    default:
                } break;
            case ColourGameId.dragon:
                switch (numberOfSelection) {
                    case 6: return 904;
                    case 7: return 905;
                    case 8: return 906;
                    case 9: return 907;
                    case 10: return 908;
                    case 15: return 909;
                    default:
                }break;
            case ColourGameId.betzero:
                switch (numberOfSelection) {
                    case 1: return 910;
                    case 2: return 911;
                    case 3: return 912;
                    case 4: return 913;
                    default:
                } break;

            default:
                break;
        }
    }
}
