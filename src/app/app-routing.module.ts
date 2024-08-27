import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './views/weather/landing-page/landing-page.component'

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    data: {
      title: 'Login Page'
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
