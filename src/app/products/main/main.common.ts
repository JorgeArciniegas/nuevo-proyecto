import { Routes } from '@angular/router';
import { EventListComponent } from './events-list/events-list.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { RaceControlComponent } from './race-control/race-control.component';
import { MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';
import { RaceComponent } from './results/templates/race/race.component';
import { PlayableRaceComponent } from './playable-board/templates/race/playablerace.component';
import { StandardListComponent } from './events-list/templates/standard-list/standard-list.component';

export const componentDeclarations: any[] = [
  MainComponent,
  RaceControlComponent,
  EventListComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe,
  RaceComponent,
  PlayableRaceComponent,
  StandardListComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
