import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { LAYOUT_TYPE } from '../../../../../../environments/environment.models';
import { EventsResultsWithDetails, LastResult } from '../../results.model';
import { ResultsService } from '../../results.service';

@UntilDestroy()
@Component({
  selector: 'app-results-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss', '../../results.component.scss']
})
export class SoccerComponent {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() codeProduct: string;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  public results: Observable<EventsResultsWithDetails[]>;

  constructor(public resultsService: ResultsService) {
    this.results = this.resultsService.lastResultsSubject.pipe(
      untilDestroyed(this),
      filter(el => el.layoutType && el.layoutType === LAYOUT_TYPE.SOCCER),
      map((res: LastResult) => res.eventResults)
    );
  }

}
