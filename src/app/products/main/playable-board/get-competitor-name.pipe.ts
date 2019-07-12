import { Pipe, PipeTransform } from '@angular/core';
import { VirtualBetCompetitor } from '@elys/elys-api';
import { strictEqual } from 'assert';

@Pipe({
  name: 'getCompetitorName'
})
export class GetCompetitorNamePipe implements PipeTransform {
  transform(selectionName: string, competitors: VirtualBetCompetitor[]): string {
    let competitorName = '';
    if (selectionName.includes('1', 0)) {
      console.log('Sono 1!');
      competitorName = competitors.find(competitor => competitor.ito === 1).nm;
    } else if (selectionName.includes('2', 0)) {
      console.log('Sono 2!');
      competitorName = competitors.find(competitor => competitor.ito === 2).nm;
    }
    return competitorName;
  }
}
