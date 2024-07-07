import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardModule } from '@dashboard/dashboard.module';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DashboardModule,AuthModule
  ]
})
export class HomeModule { }
