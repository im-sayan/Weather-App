import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapsModule} from '@angular/google-maps'
import { WeatherRoutingModule } from './weather-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    WeatherRoutingModule,
    FormsModule
  ],
})
export class WeatherModule { }
