import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { PurchaseService } from '../../../core/services/purchase.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.scss']
})
export class PurchaseCreateComponent implements OnInit {

  formAddProduct: FormGroup;
  formPurchase: FormGroup;
  products: Product[] = [];
  isLoadingProducts = false;
  newProducts = [];

  constructor(
    private formBuilderProduct: FormBuilder,
    private formBuilderPurchase: FormBuilder,
    private dialog: MatDialog,
    private productService: ProductService,
    private notificationService: NotificationService,
    private purchaseService: PurchaseService,
    public router: Router
  ) {
    this.createForms();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  createForms(): void {
    this.formAddProduct = this.formBuilderProduct.group({
      product: new FormControl('', [ Validators.required ]),
      units: new FormControl('', [ Validators.required ]),
      unitPrice: new FormControl('', [ Validators.required ])
    });
    this.formPurchase = this.formBuilderPurchase.group({
      purchaseDate: new FormControl('', [ Validators.required ]),
      reference: new FormControl('', [ Validators.required ])
    });
  }

  /**
   * Obtiene listado de productos
   */
  getProducts(): void {
    this.isLoadingProducts = true;
    this.productService.getProducts().then(res => {
      console.log(res);
      this.products = res;
      if (res.length > 0) {
        this.products = res;
      } else {
        this.products = [];
      }
      this.isLoadingProducts = false;
    }).catch(err => {
      this.isLoadingProducts = false;
      this.notificationService.showMessage('Error', err, 'error');
    });
  }

  registerProduct(): void {
    if (this.formAddProduct.valid) {
      const selected = this.formAddProduct.getRawValue();
      this.newProducts.push({
        productId: selected.product.id,
        name: selected.product.name,
        units: selected.units,
        price: selected.unitPrice,
        totalCost: selected.units * selected.unitPrice
      });
      this.formAddProduct.reset();
      this.closeModal();
    } else {
      this.notificationService.showMessage('Error', 'No se pudo agregar el producto', 'error');
    }
  }

  registerPurchase(): void {
    console.log(this.formPurchase.getRawValue());
    if (this.formPurchase.valid) {
      if (this.newProducts.length > 0){
        const selected = this.formPurchase.getRawValue();
        const purchase = {
          reference: selected.reference,
          purchaseDate: selected.purchaseDate,
          updateDate: selected.purchaseDate,
          product: this.newProducts
        };
        this.purchaseService.createPurchase(purchase).subscribe( (res: Response) => {
          this.notificationService.showMessage('Guardado', 'La compra fue registrada', 'success');
          this.reset();
          this.router.navigate(['/compras']);
        }, err => {
          this.notificationService.showMessage('Error', err, 'error');
        });
      } else {
        this.notificationService.showMessage('Advertencia', 'Por favor registre un producto', 'warning');
      }
    } else {
      this.notificationService.showMessage('Error', 'No se pudo registrar la compra', 'error');
    }
  }

  reset(): void  {
    this.formPurchase.reset();
    this.formAddProduct.reset();
  }

  openModal(templateRef: TemplateRef<any>): void {
    console.log(templateRef);
    this.dialog.open(templateRef);
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
