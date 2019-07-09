import { Routes } from '@angular/router';
import { EventListComponent } from './events-list/events-list.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { EventControlComponent } from './event-control/event-control.component';
import { MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';
import { RaceComponent as ResultsRaceComponent } from './results/templates/race/race.component';
import { PlayableBoardRaceComponent } from './playable-board/templates/playable-board-race/playable-board-race.component';
import { StandardListComponent } from './events-list/templates/standard-list/standard-list.component';
import { StandardComponent } from './event-control/templates/standard/standard.component';
import { CockfightComponent } from './results/templates/cockfight/cockfight.component';

export const componentDeclarations: any[] = [
  MainComponent,
  EventControlComponent,
  EventListComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe,
  ResultsRaceComponent,
  PlayableBoardRaceComponent,
  StandardListComponent,
  StandardComponent,
  CockfightComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
