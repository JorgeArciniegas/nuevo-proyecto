import { Routes } from '@angular/router';
import { EventListComponent } from './events-list/events-list.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { EventControlComponent } from './event-control/event-control.component';
import { MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';
import { RaceComponent as ResultsRaceComponent } from './results/templates/race/race.component';
import { RaceComponent as LuckyRaceComponent } from './lucky/templates/race/race.component';
import { CockComponent as LuckyCockComponent } from './lucky/templates/cock/cock.component';
import { RaceComponent as PlayableBoardRaceComponent } from './playable-board/templates/race/race.component';
import { StandardListComponent } from './events-list/templates/standard-list/standard-list.component';
import { StandardComponent } from './event-control/templates/standard/standard.component';
import { CockFightComponent as PlayableBoardCockFightComponent } from './playable-board/templates/cock-fight/cock-fight.component';
import { FilterAndSortByShownMarketsPipe } from './playable-board/filter-and-sort-by-shown-markets.pipe';
import { CompetitorNamePipe } from './playable-board/competitor-name.pipe';
import { LuckyComponent } from './lucky/lucky.component';
import { CockfightComponent as ResultsCockfightComponent } from './results/templates/cockfight/cockfight.component';
import { CompetitorItoPipe } from './playable-board/competitor-ito.pipe';
import { ExtractSignPipe } from './playable-board/extract-sign.pipe';

export const componentDeclarations: any[] = [
  MainComponent,
  EventControlComponent,
  EventListComponent,
  LuckyComponent,
  LuckyCockComponent,
  LuckyRaceComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe,
  FilterAndSortByShownMarketsPipe,
  CompetitorNamePipe,
  CompetitorItoPipe,
  ExtractSignPipe,
  ResultsRaceComponent,
  PlayableBoardRaceComponent,
  StandardListComponent,
  StandardComponent,
  ResultsCockfightComponent,
  PlayableBoardCockFightComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
