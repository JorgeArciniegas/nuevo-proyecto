import { Routes } from '@angular/router';
import { EventListComponent } from './events-list/events-list.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { EventControlComponent } from './event-control/event-control.component';
import { MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';
import { RaceComponent as ResultsRaceComponent } from './results/templates/race/race.component';
import { RaceComponent as LuckyRaceComponent } from './lucky/templates/race/race.component';
import { CockFightComponent as LuckyCockFightComponent } from './lucky/templates/cock-fight/cock-fight.component';
import { RaceComponent as PlayableBoardRaceComponent } from './playable-board/templates/race/race.component';
import { StandardComponent as EventsListStandardComponent } from './events-list/templates/standard/standard.component';
import { StandardComponent as EventControlStandardComponent } from './event-control/templates/standard/standard.component';
import { CockFightComponent as PlayableBoardCockFightComponent } from './playable-board/templates/cock-fight/cock-fight.component';
import { FilterAndSortByShownMarketsPipe } from './playable-board/filter-and-sort-by-shown-markets.pipe';
import { CompetitorNamePipe } from './playable-board/competitor-name.pipe';
import { LuckyComponent } from './lucky/lucky.component';
import { CockFightComponent as ResultsCockFightComponent } from './results/templates/cock-fight/cock-fight.component';
import { CompetitorItoPipe } from './playable-board/competitor-ito.pipe';
import { ExtractSignPipe } from './playable-board/extract-sign.pipe';
import { SoccerComponent as PlayableBoardSoccerComponent } from './playable-board/templates/soccer/soccer.component';
import { OverviewComponent as PlayableBoardSoccerOverviewComponent } from './playable-board/templates/soccer/overview/overview.component';
import { DetailComponent as PlayableBoardSoccerDetailComponent } from './playable-board/templates/soccer/detail/detail.component';

import { SoccerComponent as ResultsSoccerComponent } from './results/templates/soccer/soccer.component';
import { SoccerComponent as LuckySoccerComponent } from './lucky/templates/soccer/soccer.component';
import { GetArrayFromNumberPipe } from './playable-board/templates/get-array-from-number.pipe';
import { FilterMarketsByAreaColumnPipe } from './playable-board/filter-markets-by-area-column.pipe';

export const componentDeclarations: any[] = [
  MainComponent,
  EventControlComponent,
  EventListComponent,
  LuckyComponent,
  LuckyCockFightComponent,
  LuckyRaceComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe,
  FilterAndSortByShownMarketsPipe,
  GetArrayFromNumberPipe,
  FilterMarketsByAreaColumnPipe,
  CompetitorNamePipe,
  CompetitorItoPipe,
  ExtractSignPipe,
  ResultsRaceComponent,
  PlayableBoardRaceComponent,
  EventsListStandardComponent,
  EventControlStandardComponent,
  ResultsCockFightComponent,
  PlayableBoardCockFightComponent,
  PlayableBoardSoccerComponent,
  PlayableBoardSoccerOverviewComponent,
  PlayableBoardSoccerDetailComponent,
  ResultsSoccerComponent,
  LuckySoccerComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
