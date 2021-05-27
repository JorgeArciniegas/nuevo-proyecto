import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FloorPipe } from '../component/pipe/floor.pipe';
import { SplitStringPipe } from './pipes/split-string.pipe';
import { GroupByCategoryPipe } from '../component/pipe/groupBy.pipe';
import { DigitslimitPipe } from '../component/pipe/digitslimit.pipe';

@NgModule({
  declarations: [FloorPipe, SplitStringPipe, DigitslimitPipe, GroupByCategoryPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  exports: [FormsModule, ReactiveFormsModule, TranslateModule, FloorPipe, SplitStringPipe, DigitslimitPipe, GroupByCategoryPipe],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
