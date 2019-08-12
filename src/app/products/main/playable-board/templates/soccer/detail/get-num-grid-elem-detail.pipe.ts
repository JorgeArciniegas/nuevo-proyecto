import { Pipe, PipeTransform } from '@angular/core';
import { MarketArea, Area } from '../../../../../../products/main/main.models';

// Pipe to calculate the number of row or column where the element is located. Available only with a maximum number of two columns per Area.
@Pipe({
  name: 'getNumGridElemDetail'
})
export class GetNumGridElemDetailPipe implements PipeTransform {
  transform(area: Area, elemType: string, areaColumnIndex: number, marketIndex: number, oddIndex: number): number {
    let elemNum: number;
    switch (elemType) {
      case 'row':
        if (marketIndex === 0) {
          if (area.markets[marketIndex].layoutGridDefinition.marketCols <= oddIndex) {
            elemNum = Math.floor(oddIndex / area.markets[marketIndex].layoutGridDefinition.marketCols);
          } else {
            elemNum = 0;
          }
        } else {
          let oldRowNum = 0;
          let i = 0;
          while (i < marketIndex) {
            oldRowNum += area.markets[i].layoutGridDefinition.marketRows;
            i++;
          }
          elemNum = oldRowNum + Math.floor(oddIndex / area.markets[marketIndex].layoutGridDefinition.marketCols);
        }
        // Logic to calculate the row number of the second column.
        if (areaColumnIndex !== 0) {
          elemNum = elemNum - areaColumnIndex * area.layoutDefinition.areaRowsByCol[areaColumnIndex - 1];
        }
        break;
      case 'col':
        if (area.markets[marketIndex].layoutGridDefinition.marketCols <= oddIndex) {
          elemNum =
            oddIndex -
            Math.floor(oddIndex / area.markets[marketIndex].layoutGridDefinition.marketCols) *
              area.markets[marketIndex].layoutGridDefinition.marketCols;
        } else {
          elemNum = oddIndex;
        }
    }
    return elemNum;
  }
}
