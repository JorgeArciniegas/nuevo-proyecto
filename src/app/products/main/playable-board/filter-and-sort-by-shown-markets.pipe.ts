import { Pipe, PipeTransform } from '@angular/core';
import { VirtualBetMarket } from '@elys/elys-api';
import { Market } from '../../products.model';

/**
 * Pipe to filter the market to show and sort them and their selections.
 * The markets are sorting through the index of the shownMarket array is passed to the pipe.
 * The selection of each market are sorted using their "tp" attribute.
 */
@Pipe({
  name: 'filterAndSortByShownMarkets'
})
export class FilterAndSortByShownMarketsPipe implements PipeTransform {
  transform(markets: VirtualBetMarket[], shownMarkets: Market[]): VirtualBetMarket[] {
    // Get the markets to show.
    let shownMarket: VirtualBetMarket[] = markets.filter(market => shownMarkets.includes(market.tp as number));
    // Sort the selection of each market using their "tp" attribute.
    shownMarket = shownMarket.map(market => {
      market.sls.map(selection => {
        // Remove the informaton about the competitor from the selection name if they are present.
        const index = selection.nm.indexOf('+');
        if (index > 0 && index < 3) {
          selection.nm = selection.nm.substring(index + 2);
        }
      });
      market.sls = market.sls.sort((a, b) => a.tp - b.tp);
      return market;
    });
    // Sort the markets using the index of the shownMarkets array.
    shownMarket.sort((a, b) => shownMarkets.indexOf(a.tp as number) - shownMarkets.indexOf(b.tp as number));
    return shownMarket;
  }
}
