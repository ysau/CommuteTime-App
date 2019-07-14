import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'commute time';
  description = 'discover a better commute.'

  constructor(private router: Router) {
  }

  redirect() {
    this.router.navigate(['./address']);
  }
}
