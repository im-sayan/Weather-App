import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {GoogleMapsModule} from '@angular/google-maps'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from '../app/views/weather/landing-page/landing-page.component';
import {DetailsComponent} from '../app/views/weather/details/details.component'
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DetailsComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-buttom-right',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
