import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FeaturesRoutingModule } from './features-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../core/services/product.service';
import { NotificationService } from '../core/services/notification.service';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  /* providers: [
    ProductService,
    NotificationService
  ] */
})
export class FeaturesModule { }
