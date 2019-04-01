import { Routes } from '@angular/router';
import { DogracingComponent } from './dogracing.component';
import { RaceControlComponent } from './race-control/race-control.component';
import { ListRaceComponent } from './list-race/list-race.component';
import { ResultListComponent } from './result-list/result-list.component';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';

export const componentDeclarations: any[] = [
  DogracingComponent,
  RaceControlComponent,
  ListRaceComponent,
  ResultListComponent,
  PlayableBoardComponent,
  FilterByPositionPipe
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: DogracingComponent
  }
];
