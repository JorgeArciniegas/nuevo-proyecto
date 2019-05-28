import { Routes } from '@angular/router';
import { ListRaceComponent } from './list-race/list-race.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { RaceControlComponent } from './race-control/race-control.component';
import { RacingComponent as RacingComponent } from './racing.component';
import { ResultListComponent } from './result-list/result-list.component';


export const componentDeclarations: any[] = [
  RacingComponent,
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
    component: RacingComponent
  },


];
