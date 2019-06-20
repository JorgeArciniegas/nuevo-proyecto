import { Routes } from '@angular/router';
import { ListRaceComponent } from './list-race/list-race.component';
import { FilterByPositionPipe } from './playable-board/filter-by-position.pipe';
import { PlayableBoardComponent } from './playable-board/playable-board.component';
import { RaceControlComponent } from './race-control/race-control.component';
import { MainComponent as MainComponent } from './main.component';
import { ResultsComponent } from './results/results.component';


export const componentDeclarations: any[] = [
  MainComponent,
  RaceControlComponent,
  ListRaceComponent,
  ResultsComponent,
  PlayableBoardComponent,
  FilterByPositionPipe
];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },


];
