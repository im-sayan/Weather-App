import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './views/weather/landing-page/landing-page.component'
import { DetailsComponent } from './views/weather/details/details.component'

const routes: Routes = [
  {
    path: 'details-forcast',
    component: DetailsComponent,
    data: {
      title: 'Forcast Details'
    },
    
  },
  {
    path: '',
    component: LandingPageComponent,
    data: {
      title: 'Today Forcast'
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
