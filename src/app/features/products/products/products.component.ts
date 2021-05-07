import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  isLoading = false;
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Obtiene listado de usuarios
   */
   getUsers(): void {
    this.isLoading = true;
    this.productService.getProducts().then(res => {
      console.log(res);
      this.products = res;
      if (res.length > 0) {
        this.products = res;
      } else {
        this.products = [];
      }
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.notificationService.showMessage('Error', err, 'error');
    });
  }

}
