import { Pipe, PipeTransform } from '@angular/core';
import { VirtualBetCompetitor } from '@elys/elys-api';

@Pipe({
  name: 'filterByCompetitor'
})
export class FilterByCompetitorPipe implements PipeTransform {
  transform(competitors: VirtualBetCompetitor[], competitorId: number): VirtualBetCompetitor[] {
    return competitors.filter(competitor => {
      console.log(competitorId);
      return competitor.ito === competitorId;
    });
  }
}
