import { Pipe, PipeTransform } from '@angular/core';
import { MarketArea } from '../../../../../../products/main/main.models';

@Pipe({
  name: 'getNumGridElemDetail'
})
export class GetNumGridElemDetailPipe implements PipeTransform {
  transform(markets: MarketArea[], elemType: string, marketIndex: number, oddIndex: number): number {
    let elemNum: number;
    switch (elemType) {
      case 'row':
        if (marketIndex === 0) {
          if (markets[marketIndex].layoutGridDefinition.marketCols <= oddIndex) {
            elemNum = Math.floor(oddIndex / markets[marketIndex].layoutGridDefinition.marketCols);
          } else {
            elemNum = 0;
          }
        } else {
          let oldRowNum = 0;
          let i = 0;
          while (i < marketIndex) {
            oldRowNum += markets[i].layoutGridDefinition.marketRows;
            i++;
          }
          elemNum = oldRowNum + Math.floor(oddIndex / markets[marketIndex].layoutGridDefinition.marketCols);
        }
        console.log(
          'Market col: ',
          markets[marketIndex].layoutGridDefinition.marketCols,
          'Market index: ',
          marketIndex,
          'Market name: ',
          markets[marketIndex].name,
          'Odd index: ',
          oddIndex,
          'Elem num: ',
          elemNum
        );
        break;
      case 'col':
        if (markets[marketIndex].layoutGridDefinition.marketCols <= oddIndex) {
          elemNum =
            oddIndex -
            Math.floor(oddIndex / markets[marketIndex].layoutGridDefinition.marketCols) *
              markets[marketIndex].layoutGridDefinition.marketCols;
        } else {
          elemNum = oddIndex;
        }
    }
    return elemNum;
  }
}
