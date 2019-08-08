import { Pipe, PipeTransform } from '@angular/core';
import { MarketArea } from '../../../main.models';

@Pipe({
  name: 'getNumColOverview'
})
export class GetNumColOverviewPipe implements PipeTransform {
  transform(markets: MarketArea[], marketIndex: number, oddIndex: number): number {
    let colNum: number;
    if (marketIndex === 0) {
      colNum = oddIndex;
    } else {
      const oldColNum = markets[marketIndex - 1].selections.length;
      colNum = oldColNum + oddIndex + 1;
    }

    return colNum;
  }
}
