import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommuteService} from "../commute.service";

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  work_address: string = '';
  other_work_address: string = '';
  home: string = '';
  message: string = '';
  showMap: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commuteService: CommuteService
  ) {
  }

  ngOnInit(): void {
    this.getParams();
    this.makeRecommendation();
  }

  makeRecommendation(): void {
    if (this.work_address === this.other_work_address) {
      this.home = this.work_address;
      this.message = 'Since both of you work in the same city, that was an obvious choice!';
    } else {
      this.getHomeRecommendation();
      this.message = 'Living in there is a good choice for both of your commutes.';
      this.showMap = true;
    }
  }

  getParams(): void {
    const param1 = this.route.snapshot.paramMap.get('work1');
    this.work_address = param1;

    const param2 = this.route.snapshot.paramMap.get('work2');
    this.other_work_address = param2;
  }

  getHomeRecommendation(): void {
    this.commuteService.getHomeRecommendation(this.work_address, this.other_work_address).subscribe(home => this.home = home)
  }


  checkSelection(): boolean {
    if (this.work_address !== '' && this.other_work_address !== '') {
      return true;
    }
  }

  redirect() {
    window.open("https://www.google.com/search?q=apartment+in+".concat(this.home), "_blank");
}
}
