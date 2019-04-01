import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MatGridListModule, MatButtonModule, TranslateModule],
  exports: [FlexLayoutModule, MatGridListModule, MatButtonModule, TranslateModule]
})
export class SharedModule {}
