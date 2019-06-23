import { Routes } from '@angular/router';
import { ListRaceComponent } from './events-list/events-list.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { RaceControlComponent } from './race-control/race-control.component';
import { MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';
import { RaceComponent } from './results/templates/race/race.component';
import { PlayableRaceComponent } from './playable-board/templates/race/playablerace.component';

export const componentDeclarations: any[] = [
  MainComponent,
  RaceControlComponent,
  ListRaceComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe,
  RaceComponent,
  PlayableRaceComponent
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];
