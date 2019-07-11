import { Pipe, PipeTransform } from '@angular/core';
import { VirtualBetMarket } from '@elys/elys-api';
import { COCK_MARKET } from '../../products.model';

@Pipe({
  name: 'filterAndSortByShownMarkets'
})
export class FilterAndSortByShownMarketsPipe implements PipeTransform {
  transform(markets: VirtualBetMarket[], shownMarkets: COCK_MARKET[]): VirtualBetMarket[] {
    const output: VirtualBetMarket[] = markets.filter(market => shownMarkets.includes(market.tp as number));
    output.sort((a, b) => shownMarkets.indexOf(a.tp as number) - shownMarkets.indexOf(b.tp as number));
    return output;
  }
}
