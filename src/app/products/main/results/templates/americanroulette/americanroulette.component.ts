import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LAYOUT_TYPE } from '../../../../../../environments/environment.models';
import { ResultsService } from '../../results.service';
import { EventsResultsWithDetails, LastResult } from './../../results.model';

@UntilDestroy()
@Component({
  selector: 'app-results-americanroulette',
  templateUrl: './americanroulette.component.html',
  styleUrls: ['./americanroulette.component.scss']
})
export class AmericanrouletteComponent {

  @Input() rowHeight: number;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  public results: Observable<EventsResultsWithDetails[]>;

  constructor(public resultsService: ResultsService) {
    this.results = this.resultsService.lastResultsSubject.pipe(
      untilDestroyed(this),
      filter(el => el.layoutType && el.layoutType === LAYOUT_TYPE.AMERICANROULETTE),
      map((res: LastResult) => res.eventResults)
    );
  }
}
