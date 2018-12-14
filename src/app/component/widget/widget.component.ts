import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  public settings: AppSettings;

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  ngOnInit() {}
}
