import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NewsComponent } from './components/news/news.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
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
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
