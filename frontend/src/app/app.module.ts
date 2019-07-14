import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {MapsComponent} from './maps/maps.component';
import {CommutesComponent} from './commutes/commutes.component';
import {CitySearchComponent} from './city-search/city-search.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {AddressComponent} from './address/address.component';
import {OtherAddressComponent} from './other-address/other-address.component';
import {RecommendComponent} from './recommend/recommend.component';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    CommutesComponent,
    CitySearchComponent,
    HomeComponent,
    AddressComponent,
    OtherAddressComponent,
    RecommendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
