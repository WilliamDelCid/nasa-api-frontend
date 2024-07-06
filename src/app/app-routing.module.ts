import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './layouts/skeleton/skeleton.component';

const routes: Routes = [
  {
    path:'',
    component:SkeletonComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import('@home/home.module').then(m=>m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
