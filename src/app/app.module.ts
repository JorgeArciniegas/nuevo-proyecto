import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { HeaderComponent } from './component/header/header.component';
import { ProductsComponent } from './products/products.component';
@NgModule({
  declarations: [AppComponent, ProductsComponent, HeaderComponent],
  imports: [BrowserModule, FlexLayoutModule, routing],
  providers: [AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule {}
