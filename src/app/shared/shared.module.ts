import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FloorPipe } from '../component/pipe/floor.pipe';
import { GetEnumKeyByEnumValuePipe } from './pipes/get-enum-key-by-enum-value.pipe';
@NgModule({
  declarations: [FloorPipe, GetEnumKeyByEnumValuePipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule],
  exports: [FormsModule, GetEnumKeyByEnumValuePipe, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule, FloorPipe]
})
export class SharedModule {}
