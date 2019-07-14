import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {AddressComponent} from "./address/address.component";
import {OtherAddressComponent} from "./other-address/other-address.component";
import {RecommendComponent} from "./recommend/recommend.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'address', component: AddressComponent},
  {path: 'otheraddress/:city', component: OtherAddressComponent},
  {path: 'recommend/:work1/:work2', component: RecommendComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
