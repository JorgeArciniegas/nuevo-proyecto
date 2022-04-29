import { Component, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { WindowSize } from '../../../../../../../src/app/products/products.model';
import { LAYOUT_TYPE } from '../../../../../../environments/environment.models';
import { ResultsService } from '../../results.service';
import { EventResult, LastResult } from './../../results.model';

@UntilDestroy()
@Component({
  selector: 'app-results-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() codeProduct: string;
  @Input() windowSize: WindowSize;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  public results: Observable<EventResult[]>;
  public get coundDown(): number {
    //console.log('race-cd',this.resultsService?.countDown)
    if (this.resultsService?.countDown) {
      return this.resultsService.countDown.minute * 60 + this.resultsService.countDown.second;
    }
    return 0;
  }
  constructor(private resultsService: ResultsService) {
    this.results = this.resultsService.lastResultsSubject.pipe(
      untilDestroyed(this),
      filter(el => el.layoutType === LAYOUT_TYPE.RACING),
      map((res: LastResult) => res.eventResults)
    );
  }

}
