import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then( m => m.PublicModule)
  },
  {
    path: '',
    loadChildren: () => import('./features/features.module').then( m => m.FeaturesModule)
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
