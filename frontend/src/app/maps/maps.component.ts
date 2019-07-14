import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {CommuteService} from "../commute.service";


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnChanges {

  @Input() origin: string;
  @Input() destination: string;

  public mapURL: string;

  constructor(public sanitizer: DomSanitizer, private commuteService: CommuteService) {

  }


  getMapUrl(): void {
    this.commuteService.getMapUrl(this.origin, this.destination).subscribe(URL => this.mapURL = URL);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['origin'] !== undefined) {
      this.origin = changes['origin'].currentValue;
    }
    if (changes['destination'] !== undefined) {
      this.destination = changes['destination'].currentValue;
    }
    if (this.origin != '' && this.destination != '') {
      this.getMapUrl();
    }
  }
}
