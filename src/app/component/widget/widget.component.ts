import { Component, Input, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { IconSize } from '../model/iconSize.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  public settings: AppSettings;

  @Input()
  private rowHeight: number;

  public widgetIcon: IconSize;

  constructor(public readonly appSettings: AppSettings) {
    this.settings = appSettings;
  }

  ngOnInit() {
    this.widgetIcon = new IconSize(this.rowHeight * 0.7, this.rowHeight * 0.7);
  }
}
