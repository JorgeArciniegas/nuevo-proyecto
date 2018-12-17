import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { BtncalcComponent } from './component/btncalc/btncalc.component';
import { ApplicationMenuComponent } from './component/header/application-menu/application-menu.component';
import { HeaderComponent } from './component/header/header.component';
import { UserMenuComponent } from './component/header/user-menu/user-menu.component';
import { WidgetComponent } from './component/widget/widget.component';
import { DogracingComponent } from './products/dogracing/dogracing.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HeaderComponent,
    UserMenuComponent,
    ApplicationMenuComponent,
    DogracingComponent,
    WidgetComponent,
    BtncalcComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    routing,
    MatGridListModule,
    MatButtonModule
  ],
  providers: [AppSettings, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
