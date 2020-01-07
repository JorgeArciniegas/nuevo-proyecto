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
      let oldColNum = 0;
      let i = 0;
      while (i < marketIndex) {
        oldColNum += markets[i].selections.length;
        i++;
      }
      colNum = oldColNum + oddIndex;
    }

    return colNum;
  }
}
