import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule {}
