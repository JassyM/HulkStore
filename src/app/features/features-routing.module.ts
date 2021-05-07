import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PurchaseModule } from './purchase/purchase.module';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'compras',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
