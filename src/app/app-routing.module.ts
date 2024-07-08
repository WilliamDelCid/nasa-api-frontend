import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layouts/skeleton/skeleton.component';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const routes: Routes = [
  {
    path:'',
    component:SkeletonComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import('@home/home.module').then(m=>m.HomeModule)
      },
      {
        path:'dashboard',
        loadChildren:()=>import('@dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate:[AuthGuard]
      }
    ]
  },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
