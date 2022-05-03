import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LAYOUT_TYPE } from '../../../../../../environments/environment.models';
import { ResultsService } from '../../results.service';
import { AmericanRouletteRug } from './../../../playable-board/templates/american-roulette/american-roulette.models';
import { EventResult, LastResult } from './../../results.model';

@UntilDestroy()
@Component({
  selector: 'app-results-americanroulette',
  templateUrl: './americanroulette.component.html',
  styleUrls: ['./americanroulette.component.scss', '../../results.component.scss']
})
export class AmericanrouletteComponent {

  @Input() rowHeight: number;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  americanRouletteRug: AmericanRouletteRug;

  public results: Observable<EventResult[]>;

  constructor(private resultsService: ResultsService) {
    this.results = this.resultsService.lastResultsSubject.pipe(
      untilDestroyed(this),
      filter(el => el.layoutType && el.layoutType === LAYOUT_TYPE.AMERICANROULETTE),
      map((res: LastResult) => res.eventResults),
      tap((results: EventResult[]) => {
        results.forEach(
          res => { res.americanRouletteResults.color = this.getColorClass(res.americanRouletteResults.result) }
        );
      }),
    );
    this.americanRouletteRug = new AmericanRouletteRug();
  }

  private getColorClass(n: number | string): string {
    // tslint:disable-next-line:max-line-length
    return this.americanRouletteRug.red.includes(parseInt(n.toString(), 10)) ? 'red' : (this.americanRouletteRug.black.includes(parseInt(n.toString(), 10)) ? 'black' : 'green');
  }


}
