import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  searchQuery: string = '';
  apiData: any = '';
  apiKey: any = 'c3a5082787b04f4b9ed195001241009';
  lat: any = '';
  long: any = '';
  ipData: any = '';  // Stores the IP details
  queryData: any = '';
  currentData: any = '';
  forcastData: any = [];
  selectedDay: any = '';
  location: any = '';
  loading: boolean = false;  // Loader flag

  errormodel: boolean = false;

  hasAlert = false;
  showAlert = false;
  alerts : any = [];
  aiq: any = '';

  selectday(index: any) {
    this.selectedDay = this.forcastData[index];
    this.router.navigate(['/details-forcast'], { state: { selectedDay: this.selectedDay } });
  }

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}
      
  ngOnInit(): void {
    //this.GetLocation();
    this.getIPDetails();  // Retrieve IP and IP details on component init
  }

  // Function to retrieve weather forecast
  WeatherForcast() {
    this.loading = true;  // Show loader
    let getCordinate = localStorage.getItem('cordinate')
    console.log(getCordinate,"getCordinategetCordinategetCordinate=======");
    if(getCordinate != null ){
      this.queryData = getCordinate
    }
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${this.queryData}&days=5&alerts=yes&aqi=yes&key=${this.apiKey}`;
    
    this.http.get(apiUrl).subscribe(
      (response) => {
        this.apiData = response;
        this.forcastData = [];
        this.location = this.apiData.location;
        localStorage.setItem('location', JSON.stringify(this.location));
        this.aiq = this.apiData.current.air_quality['us-epa-index'];

        for(let item of this.apiData.forecast.forecastday){
          this.forcastData.push(item);
        }
        this.loading = false;  // Hide loader
        
        // let forcastalert: any[] = [
        //   {
        //     "headline": "NWS New York City - Upton (Long Island and New York City)",
        //     "msgtype": null,
        //     "severity": null,
        //     "urgency": null,
        //     "areas": null,
        //     "category": "Extreme temperature value",
        //     "certainty": null,
        //     "event": "Heat Advisory",
        //     "note": null,
        //     "effective": "2022-07-21T19:38:00+00:00",
        //     "expires": "2022-07-25T00:00:00+00:00",
        //     "desc": "...HEAT ADVISORY REMAINS IN EFFECT UNTIL 8 PM EDT SUNDAY... * WHAT...Heat index values up to 105. * WHERE...Eastern Passaic Hudson Western Bergen Western Essex Eastern Bergen and Eastern Essex Counties. * WHEN...Until 8 PM EDT Sunday. * IMPACTS...High temperatures and high humidity may cause heat illnesses to occur.",
        //     "instruction": ""
        //   }
        // ];
  
        // Push alerts to the alerts array
        for (let item of this.apiData.alerts.alert) {
          this.alerts.push(item);
        }
        if(this.alerts.length > 0){
          this.hasAlert = true;
        }else{
          this.hasAlert = false;
        }
      },
      (error) => {
        this.queryData = '';
        this.errormodel = true;
        // this.toastr.error('Failed to fetch weather forecast for this location');
        this.loading = false;  // Hide loader
      }
    );
  }

  // Function to handle search input
  searchlocation() {
    localStorage.removeItem('cordinate');  // Removes only the 'cordinate' data
    this.queryData = this.searchQuery;
    this.WeatherForcast();
  }
  

  // Function to reload the page
  reload() {
    window.location.reload();
    if(this.queryData == ''){
      this.queryData = '';
    }
  }

  // Function to get user's geolocation
  GetLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.queryData = `${this.lat},${this.long}`;
          localStorage.setItem('cordinate', this.queryData)
          this.WeatherForcast();
        },
        (error) => {
          console.error('Geolocation Error:', error);
          //this.toastr.error('Failed to retrieve your location.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      //this.toastr.error('Geolocation is not supported by your browser.');
    }
  }

  // Function to retrieve user's public IP and details
  getIPDetails() {
    // Retrieve IP address and details using ipapi
    this.http.get('https://ipapi.co/json/').subscribe(
      (ipDetails: any) => {
        console.log('IP Details:', ipDetails);
        this.ipData = ipDetails;  // Update with detailed IP information
  
        // Set location based on IP data (fallback in case geolocation fails)
        if (!this.queryData) {
          this.queryData = `${ipDetails.city},${ipDetails.region}`;
          this.WeatherForcast();
        }
      },
      (error) => {
        console.error('Failed to fetch IP details', error);
      }
    );
  }

  getAiqDescription(): string {
    if (this.aiq <= 2) {
      return 'Good';
    } else if (this.aiq <= 4) {
      return 'Moderate';
    } else {
      return 'Worst';
    }
  }

  getAiqStyle(): object {
    switch (this.getAiqDescription()) {
      case 'Good':
        return { color: 'green', fontWeight: 'bold' };
      case 'Moderate':
        return { color: 'orange', fontWeight: 'bold' };
      case 'Worst':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return {};
    }
  }
  
}

