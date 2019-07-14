import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  question: string = 'Which city are you working in?';
  work_address: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSelect(selected: string) {
    this.work_address = selected;
  }

  redirect() {
    this.router.navigate(['./otheraddress/'.concat(this.work_address)]);
  }
}
