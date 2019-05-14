import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../../../src/app/products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public service: ProductsService, public cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.service.fnWindowsSize();
    this.cdr.detectChanges();
  }

}
