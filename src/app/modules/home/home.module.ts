import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from '@dashboard/dashboard.module';


@NgModule({
  declarations: [
  
  
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DashboardModule,
  ]
})
export class HomeModule { }
