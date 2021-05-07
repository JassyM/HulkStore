import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductService } from 'src/app/core/services/product.service';
import { NotificationService } from '../../core/services/notification.service';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [
   ProductService,
   NotificationService
  ]
})
export class ProductsModule { }
