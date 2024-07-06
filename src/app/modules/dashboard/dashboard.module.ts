import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { NewsComponent } from './components/news/news.component';
import { SearchComponent } from './components/search/search.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';


@NgModule({
  declarations: [
    NewsComponent,
    FilterComponent,
    SearchComponent,
    DashboardComponent,
    WishListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,SharedModule
  ],
  exports:[
    NewsComponent,
    FilterComponent,
    SearchComponent,
    DashboardComponent,
    WishListComponent
  ]
})
export class DashboardModule { }
