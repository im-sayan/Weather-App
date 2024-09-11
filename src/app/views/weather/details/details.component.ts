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

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}
      
    ngOnInit(): void{
      this.selectedDay = history.state.selectedDay;
      console.log(this.selectedDay,"====================>>>");
      this.locationDetails = JSON.parse(localStorage.getItem('location') || '{}');
      console.log(this.locationDetails.name,'*******************');
      
    }

}
