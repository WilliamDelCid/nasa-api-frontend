import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
  },
  {
    path:'profile',
    component:ProfileComponent
  },{
    path:'wish-list',
    component:WishListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
