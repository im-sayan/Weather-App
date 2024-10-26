import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  selectedDay: any = '';
  hourly:any = [];
  locationDetails: any = '';
  IsDay: any = '';

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}
      
  ngOnInit(): void {
    // First check if selectedDay exists in history.state
    if (history.state.selectedDay) {
      this.selectedDay = history.state.selectedDay;
    } else {
      // Retrieve selectedDay from localStorage if it's stored previously
      const storedDay = localStorage.getItem('selectedDay');
      if (storedDay) {
        this.selectedDay = JSON.parse(storedDay);
      } else {
        // If no selectedDay is found, navigate to home
        this.router.navigate(['']);
      }
    }
  
    // Retrieve locationDetails from localStorage
    this.locationDetails = JSON.parse(localStorage.getItem('location') || '{}');
    this.IsDay = localStorage.getItem('is_day');
    console.log(this.selectedDay, "this.selectedDay");
    console.log(this.IsDay,"this.IsDay");
    
  }
  backToforcast() {
    this.router.navigate(['']);
  }
  

}
