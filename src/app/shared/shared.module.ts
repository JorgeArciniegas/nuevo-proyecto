import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatBadgeModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule],
  exports: [FormsModule, ReactiveFormsModule, FlexLayoutModule, MatGridListModule, TranslateModule]
})
export class SharedModule {}
