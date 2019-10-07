import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../../../src/app/products/products.service';
import { UserService } from '../../../../src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private service: ProductsService,
    public userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service.fnWindowsSize();
    this.cdr.detectChanges();
  }
}
