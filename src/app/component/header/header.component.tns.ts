import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../products/products.service';
import { UserService } from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-header, [app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private service: ProductsService,
    public userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.service.fnWindowsSize();
    this.cdr.detectChanges();
  }
}