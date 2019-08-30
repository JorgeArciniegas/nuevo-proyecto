import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FloorPipe } from '../component/pipe/floor.pipe';
import { SplitStringPipe } from './pipes/split-string.pipe';

@NgModule({
  declarations: [FloorPipe, SplitStringPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule],
  exports: [FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule, FloorPipe, SplitStringPipe]
})
export class SharedModule {}
