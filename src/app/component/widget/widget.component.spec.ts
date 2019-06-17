import { PlatformModule } from '@angular/cdk/platform';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { ElysApiModule } from '@elys/elys-api';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AppSettings } from 'src/app/app.settings';
import { ProductDialogComponent } from 'src/app/products/product-dialog/product-dialog.component';
import { ProductsService } from 'src/app/products/products.service';
import { RacingService } from 'src/app/products/racing/racing.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { WidgetTypeLink } from 'src/environments/environment.models';
import { WidgetComponent } from './widget.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('WidgetComponent', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WidgetComponent,
        ProductDialogComponent
      ],
      imports: [
        PlatformModule,
        MatDialogModule,
        HttpClientModule,
        BrowserModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        ElysApiModule.forRoot({
          language: 'en',
          urlApi: environment.baseApiUrl
        })
      ],
      providers: [AppSettings, ProductsService, RacingService, TranslateService, MatDialog],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents:  [ProductDialogComponent]
      }
    }).compileComponents();
  }));


  let fixture: ComponentFixture<WidgetComponent>;
  let component: WidgetComponent;
  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.debugElement.componentInstance;
  }); */

  it('should create the app', async((appSettings: AppSettings, productService: ProductsService, racingService: RacingService) => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.debugElement.componentInstance;
    productService.product = {
      sportId: 8,
      codeProduct: 'DOG',
      name: 'DogRacing',
      label: 'DOG',
      order: 0,
      productSelected: true,
      isPlayable: true,
      defaultAmount: null,
      toolbarButton: {
        name: 'dogracing',
        icon: 'Dog',
        route: 'products/racing'
      },
      widgets: [
        {
          name: '',
          routing: 'statistic',
          typeLink: WidgetTypeLink.MODAL,
          icon: 'baseline-assessment-24px' // without extension file
        },
      ],
    };
    fixture.detectChanges();
    // component.openRouting('statistic');
    expect(component).toBeTruthy();
  }));

  it('should create a dialog', () => {

  });
});
