import { Routes } from '@angular/router';
import { EventControlComponent } from './event-control/event-control.component';
import { EventListComponent } from './events-list/events-list.component';
import { StandardComponent as EventsListStandardComponent } from './events-list/templates/standard/standard.component';
import { LuckyComponent } from './lucky/lucky.component';
import { CockFightComponent as LuckyCockFightComponent } from './lucky/templates/cock-fight/cock-fight.component';
import { RaceComponent as LuckyRaceComponent } from './lucky/templates/race/race.component';
import { SoccerComponent as LuckySoccerComponent } from './lucky/templates/soccer/soccer.component';
import { MainComponent } from './main.component';
import { CompetitorItoPipe } from './playable-board/competitor-ito.pipe';
import { CompetitorNamePipe } from './playable-board/competitor-name.pipe';
import { ExtractCorrectScorePipe } from './playable-board/extract-correct-score.pipe';
import { ExtractSignPipe } from './playable-board/extract-sign.pipe';
import { FilterAndSortByShownMarketsPipe } from './playable-board/filter-and-sort-by-shown-markets.pipe';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { FilterMarketsByAreaColumnPipe } from './playable-board/filter-markets-by-area-column.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { CockFightComponent as PlayableBoardCockFightComponent } from './playable-board/templates/cock-fight/cock-fight.component';
import { GetArrayFromNumberPipe } from './playable-board/templates/get-array-from-number.pipe';
import { KenoComponent as PlayableBoardKenoComponentComponent } from './playable-board/templates/keno/keno.component';
import { RaceComponent as PlayableBoardRaceComponent } from './playable-board/templates/race/race.component';
import { DetailComponent as PlayableBoardSoccerDetailComponent } from './playable-board/templates/soccer/detail/detail.component';
import { OverviewComponent as PlayableBoardSoccerOverviewComponent } from './playable-board/templates/soccer/overview/overview.component';
import { SoccerComponent as PlayableBoardSoccerComponent } from './playable-board/templates/soccer/soccer.component';
import { ResultsComponent } from './results/results.component';
import { CockFightComponent as ResultsCockFightComponent } from './results/templates/cock-fight/cock-fight.component';
import { KenoComponent as ResultsKenoComponent } from './results/templates/keno/keno.component';
import { RaceComponent as ResultsRaceComponent } from './results/templates/race/race.component';
import { SoccerComponent as ResultsSoccerComponent } from './results/templates/soccer/soccer.component';
import { KenoComponent as LuckyKenoComponent } from './lucky/templates/keno/keno.component';


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
  ResultsCockFightComponent,
  PlayableBoardCockFightComponent,
  PlayableBoardSoccerComponent,
  PlayableBoardSoccerOverviewComponent,
  PlayableBoardSoccerDetailComponent,
  ResultsSoccerComponent,
  LuckySoccerComponent,
  ExtractCorrectScorePipe,
  PlayableBoardKenoComponentComponent,
  ResultsKenoComponent,
  LuckyKenoComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
