import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { DogracingComponent } from './products/dogracing/dogracing.component';
import { ProductsComponent } from './products/products.component';
import { WidgetComponent } from './component/widget/widget.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    UserMenuComponent,
    ApplicationMenuComponent,
    DogracingComponent,
    WidgetComponent
  ],
  imports: [BrowserModule, FlexLayoutModule, routing],
  providers: [AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule {}
