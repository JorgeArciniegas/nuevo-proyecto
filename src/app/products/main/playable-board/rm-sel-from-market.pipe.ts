import { Pipe, PipeTransform } from '@angular/core';
import { VirtualBetSelection } from '@elys/elys-api';

@Pipe({
  name: 'rmSelFromMarket'
})
export class RmSelFromMarketPipe implements PipeTransform {
  transform(selections: VirtualBetSelection[], selectionName: string[]): VirtualBetSelection[] {
    const selectionIndex = selections.findIndex(selection => selectionName.includes(selection.nm));
    if (selectionIndex !== -1) {
      selections.splice(selectionIndex, 1);
    }
    return selections;
  }
}
