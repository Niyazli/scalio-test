import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ui-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent implements OnInit {
  @Input() hasBackLocation: boolean;
  constructor(private _location: Location) {}

  ngOnInit(): void {}

  public back(): void {
    this._location.back();
  }
}
