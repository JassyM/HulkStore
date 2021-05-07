import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { NotificationService } from '../../core/services/notification.service';


@NgModule({
  declarations: [PurchaseComponent, PurchaseCreateComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    NotificationService
  ]
})
export class PurchaseModule { }
