import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  searchQuery: string = '';
  apiData: any = '';
  apiKey: any = '29c8d07e4f9c49f6a6c142328242308';
  lat: any = '';
  long: any = '';
  ipData: any = '';
  queryData: any = '';
  currentData: any = '';
  forcastData: any = [];
 

  constructor(private http: HttpClient, private toastr: ToastrService) {}
      
    ngOnInit(): void {
      this.GetLocation();
    }

    WeatherForcast() {
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${this.queryData}&days=5&key=${this.apiKey}`; // Replace with your API URL
      
      this.http.get(apiUrl).subscribe(
        (response) => {
          this.apiData = response;
          this.forcastData = [];
          for(let item of this.apiData.forecast.forecastday){
            this.forcastData.push(item)
          }
          
        },
        (error) => {
          this.toastr.error('Failed to fetch weather forecast this location');
        }
      );
    }

    searchlocation() {
      let search = this.searchQuery;
      this.queryData = this.searchQuery
      this.WeatherForcast()
    }

    GetLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
            this.queryData = `${this.lat},${this.long}`;
            console.log(`Latitude: ${this.lat}, Longitude: ${this.long}`);
            this.WeatherForcast();
          },
          (error) => {
            console.error('Geolocation Error:', error);
            this.toastr.error('Failed to retrieve your location.');
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        this.toastr.error('Geolocation is not supported by your browser.');
      }
    }
    
}
