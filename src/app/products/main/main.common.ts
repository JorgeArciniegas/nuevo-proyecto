import { Routes } from '@angular/router';
import { EventListComponent } from './events-list/events-list.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { EventControlComponent } from './event-control/event-control.component';
import { MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';
import { RaceComponent as ResultsRaceComponent } from './results/templates/race/race.component';
import { RaceComponent as PlayableBoardRaceComponent } from './playable-board/templates/race/race.component';
import { StandardListComponent } from './events-list/templates/standard-list/standard-list.component';
import { StandardComponent } from './event-control/templates/standard/standard.component';
import { CockfightComponent as ResultsCockFightComponent } from './results/templates/cockfight/cockfight.component';
import { CockFightComponent as PlayableBoardCockFightComponent } from './playable-board/templates/cock-fight/cock-fight.component';
import { FilterAndSortByShownMarketsPipe } from './playable-board/filter-and-sort-by-shown-markets.pipe';

export const componentDeclarations: any[] = [
  MainComponent,
  EventControlComponent,
  EventListComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe,
  FilterAndSortByShownMarketsPipe,
  ResultsRaceComponent,
  PlayableBoardRaceComponent,
  StandardListComponent,
  StandardComponent,
  ResultsCockFightComponent,
  PlayableBoardCockFightComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
