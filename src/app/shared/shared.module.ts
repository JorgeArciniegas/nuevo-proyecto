import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FloorPipe } from '../component/pipe/floor.pipe';
import { SplitStringPipe } from './pipes/split-string.pipe';
import { GroupByCategoryPipe } from '../component/pipe/groupBy.pipe';
import { DigitslimitPipe } from '../component/pipe/digitslimit.pipe';

@NgModule({
  declarations: [FloorPipe, SplitStringPipe, DigitslimitPipe, GroupByCategoryPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatGridListModule,
    TranslateModule,
    FloorPipe,
    SplitStringPipe,
    DigitslimitPipe,
    GroupByCategoryPipe]
})
export class SharedModule { }
