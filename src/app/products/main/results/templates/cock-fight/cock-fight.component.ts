import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { LAYOUT_TYPE } from '../../../../../../environments/environment.models';
import { WindowSize } from '../../../../products.model';
import { EventResult, LastResult } from '../../results.model';
import { ResultsService } from '../../results.service';

@UntilDestroy()
@Component({
  selector: 'app-results-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss', '../../results.component.scss']
})
export class CockFightComponent {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() codeProduct: string;
  @Input() windowSize: WindowSize;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  public results: Observable<EventResult[]>;

  constructor(private resultsService: ResultsService) {
    this.results = this.resultsService.lastResultsSubject.pipe(
      untilDestroyed(this),
      filter(el => el.layoutType && el.layoutType === LAYOUT_TYPE.COCK_FIGHT),
      map((res: LastResult) => res.eventResults)
    );
  }
}
