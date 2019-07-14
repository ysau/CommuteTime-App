import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-other-address',
  templateUrl: './other-address.component.html',
  styleUrls: ['./other-address.component.css']
})
export class OtherAddressComponent implements OnInit {

  question: string = 'How about your housemate?';
  work_address: string = '';
  other_work_address: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParams()
  }

  getParams(): void {
    const param = this.route.snapshot.paramMap.get('city');
    this.other_work_address = param;
  }

  onSelect(selected: string) {
    this.work_address = selected;
  }

  redirect() {
    this.router.navigate(['./recommend/'.concat(this.work_address, '/', this.other_work_address)]);
  }
}
