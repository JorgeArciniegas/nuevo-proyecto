import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { LAYOUT_TYPE } from '../../../../../../environments/environment.models';
import { EventResultWithSport, LastResult } from '../../results.model';
import { ResultsService } from '../../results.service';

@UntilDestroy()
@Component({
  selector: 'app-results-keno',
  templateUrl: './keno.component.html',
  styleUrls: ['./keno.component.scss', '../../results.component.scss']
})
export class KenoComponent {
  @Input() rowHeight: number;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  public results: Observable<EventResultWithSport[]>;

  constructor(private resultsService: ResultsService) {
    this.results = this.resultsService.lastResultsSubject.pipe(
      untilDestroyed(this),
      filter(el => el.layoutType && el.layoutType === LAYOUT_TYPE.KENO),
      map((res: LastResult) => res.eventResults)
    );
  }

}
