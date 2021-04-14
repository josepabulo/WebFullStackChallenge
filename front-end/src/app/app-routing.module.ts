import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./view/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./view/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./view/category/category.module').then(
        (mod) => mod.CategoryModule
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
