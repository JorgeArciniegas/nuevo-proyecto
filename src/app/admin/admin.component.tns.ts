import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: RouterExtensions) { }

  ngOnInit() {
  }

  goToBetList(): void {
    this.router.navigateByUrl('/admin/reports/betsList');
  }
}
