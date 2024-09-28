import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  searchQuery: string = '';
  apiData: any = '';
  apiKey: any = '4fb72b031cdd46ffa5c125850242809';
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
  alerts: any = [];
  aiq: any = '';
  latttude: any = '';
  longitude: any = '';

  selectday(index: any) {
    this.selectedDay = this.forcastData[index];
    this.router.navigate(['/details-forcast'], { state: { selectedDay: this.selectedDay } });
  }

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    //this.GetLocation();
    this.getIPDetails();  // Retrieve IP and IP details on component init
  }

  // Function to retrieve weather forecast
  WeatherForcast() {
    this.hasAlert = false;
    this.loading = true;  // Show loader
    let getCordinate = localStorage.getItem('cordinate')
    console.log(getCordinate, "getCordinategetCordinategetCordinate=======");
    if (getCordinate != null) {
      const cordinateObj = JSON.parse(getCordinate);
      this.queryData = `${cordinateObj.lat},${cordinateObj.lon}`;
      console.log(this.queryData, "Parsed Coordinates (lat, lon)");
    }
    console.log(this.queryData, "this.queryData***************121212121212");

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${this.queryData}&days=5&alerts=yes&aqi=yes&key=${this.apiKey}`;
    console.log(apiUrl, "apiurl8999999999999");

    this.http.get(apiUrl).subscribe(
      (response) => {
        this.apiData = response;
        console.log(this.apiData, "this.apiData");

        this.forcastData = [];
        this.alerts = [];
        this.location = this.apiData.location;
        localStorage.setItem('location', JSON.stringify(this.location));
        localStorage.setItem('is_day', this.apiData.current.is_day);
        localStorage.setItem('cordinate', JSON.stringify({ lat: this.location.lat, lon: this.location.lon }));
        this.aiq = this.apiData.current.air_quality['us-epa-index'];

        for (let item of this.apiData.forecast.forecastday) {
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
        if (this.alerts.length > 0) {
          this.hasAlert = true;
        } else {
          this.hasAlert = false;
        }
        console.log(this.hasAlert,"this.hasAlert");
        
      },
      (error) => {
        this.queryData = '';
        this.errormodel = true;
        this.loading = false;  // Hide loader
      }
    );
  }


  searchlocation() {
    localStorage.removeItem('cordinate');  // Removes only the 'cordinate' data
    this.queryData = this.searchQuery.trim();  // Trim whitespace from input

    const isZipCode = /^[0-9]{4,9}$/.test(this.queryData);

    console.log(isZipCode, "===isZipCodeisZipCodeisZipCode");

    let queryUrl;
    let apiKey = '3ad4ee578bec4dc2b913c2acd6fe38b2';  // Move API key to a single declaration for better reusability

    if (isZipCode) {
      // If the input is a ZIP code, search using the ZIP code
      queryUrl = `https://nominatim.openstreetmap.org/search?postalcode=${this.queryData}&format=json&addressdetails=1&limit=1`;

      // Fetch latitude and longitude from OpenCage API
      this.http.get(queryUrl).subscribe(
        (response: any) => {
          console.log(response,"responsedatatata");
          
          // Check if we got a valid result and it has geometry
          if (response.length > 0 ) {
            const lat = response[0].lat;
            const lon = response[0].lon;
            console.log(lat, lon, "Lat/Lon from ZIP Code");

            this.queryData = `${lat},${lon}`;
            console.log(this.queryData, "oooooooooooooooooooooooooooooo");


            // Store the coordinates in localStorage
            localStorage.setItem('cordinate', JSON.stringify({ lat, lon }));

            // Call WeatherForcast function with latitude and longitude
            this.WeatherForcast();
          } else {
            console.error('No location data found.');
          }
        },
        (error) => {
          console.error('Error fetching location data:', error);
        }
      );
    } else {
      // If the input is a general location, search using the location name
      this.WeatherForcast();
    }
  }




  // Function to reload the page
  reload() {
    window.location.reload();
    if (this.queryData == '') {
      this.queryData = '';
    }
  }

  // Function to get user's geolocation
  GetLocation() {
    this.searchQuery = '';
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.queryData = `${this.lat},${this.long}`;
          console.log(this.queryData, "Geolocation Success");

          localStorage.setItem('cordinate', JSON.stringify({ lat: this.lat, lon: this.long }));
          this.WeatherForcast();

          // Optionally clear watch if you only need the location once
          navigator.geolocation.clearWatch(watchId);
        },
        (error) => {
          console.error('Geolocation Error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            console.error('Permission denied by user.');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            console.error('Position unavailable.');
          } else if (error.code === error.TIMEOUT) {
            console.error('Geolocation request timed out.');
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,  // Increased timeout to 20 seconds
          maximumAge: 0
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
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
        if (localStorage.getItem('cordinate')) {
          this.queryData = localStorage.getItem('cordinate');
          this.WeatherForcast();
          console.log("11111111");

        } else {
          this.queryData = `${ipDetails.latitude},${ipDetails.longitude}`;
          this.WeatherForcast();
          console.log("222222222222");

        }
      },
      (error) => {
        console.error('Failed to fetch IP details', error);
      }
    );
  }

  getAiqDescription(): string {
    if (this.aiq > 0 && this.aiq <= 50) {
      return 'Good';
    } else if (this.aiq >= 51 && this.aiq <= 100) {
      return 'Moderate';
    }
    else if (this.aiq >= 101 && this.aiq <= 150) {
      return 'Unhealthy for Sensitive Groups';
    }
    else if (this.aiq >= 151 && this.aiq <= 200) {
      return 'Unhealthy';
    }
    else if (this.aiq >= 201 && this.aiq <= 300) {
      return 'Very Unhealthy';
    }
    else if (this.aiq > 300) {
      return 'Hazardous';
    } else {
      return 'Worst';
    }
  }

  getAiqStyle(): object {
    switch (this.getAiqDescription()) {
      case 'Good':
        return { color: 'LimeGreen', fontWeight: 'bold' };
      case 'Moderate':
        return { color: 'Gold', fontWeight: 'bold' };
      case 'Unhealthy for Sensitive Groups':
        return { color: 'OrangeRed', fontWeight: 'bold' };
      case 'Unhealthy':
        return { color: 'Crimson', fontWeight: 'bold' };
      case 'Very Unhealthy':
        return { color: 'Red', fontWeight: 'bold' };
      case 'Hazardous':
        return { color: 'Sienna', fontWeight: 'bold' };
      case 'Worst':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return {};
    }
  }

}

