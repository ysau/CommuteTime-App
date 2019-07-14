import {Component, ViewChild} from '@angular/core';
import {CommuteService} from "../commute.service";
import {Commute} from "../commute";
import {CitySearchComponent} from "../city-search/city-search.component";

@Component({
  selector: 'app-commutes',
  templateUrl: './commutes.component.html',
  styleUrls: ['./commutes.component.css']
})
export class CommutesComponent {


  commutes: Commute[];

  home: string = '';
  work1: string = '';
  work2: string = '';

  showMap: boolean = false;

  title1: string = 'Work 1: ';
  title2: string = 'Work 2: ';

  constructor(private commuteService: CommuteService) {
  }


  getHomeRecommendation(): void {
    this.commuteService.getHomeRecommendation(this.work1, this.work2).subscribe(home => this.home = home)
  }


  checkSelection(): boolean {
    if (this.work1 !== '' && this.work2 !== '') {
      return true;
    }
  }


  onSelect1(selected: string) {
    this.work1 = selected;
    if (this.checkSelection()) {
      this.getHomeRecommendation();
      this.showMap = true;
    }
  }


  onSelect2(selected: string) {
    this.work2 = selected;
    if (this.checkSelection()) {
      this.getHomeRecommendation();
      this.showMap = true;
    }
  }

  /* Implement reset button */
  @ViewChild('box1')
  private box1: CitySearchComponent;

  @ViewChild('box2')
  private box2: CitySearchComponent;

  reset(): void {
    this.showMap = false;
    this.home = '';
    this.work1 = '';
    this.work2 = '';
    this.box1.selectedCity = '';
    this.box2.selectedCity = '';
  }
}
