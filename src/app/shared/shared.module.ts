import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule],
  exports: [FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule],
})
export class SharedModule {}
