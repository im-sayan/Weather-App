import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleMapsModule} from '@angular/google-maps'
import { WeatherRoutingModule } from './weather-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    WeatherRoutingModule,
    FormsModule
  ]
})
export class WeatherModule { }
