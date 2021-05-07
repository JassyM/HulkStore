import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../../core/models/purchase.model';
import { PurchaseService } from '../../../core/services/purchase.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  isLoading = false;
  purchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases(): void {
    this.isLoading = true;
    this.purchaseService.getPurchase().then(res => {
      console.log(res);
      this.purchases = res;
      if (res.length > 0) {
        this.purchases = res;
      } else {
        this.purchases = [];
      }
      this.isLoading = false;
    }).catch(err => {
      this.isLoading = false;
      this.notificationService.showMessage('Error', err, 'error');
    });
  }

}
