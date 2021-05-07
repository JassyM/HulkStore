import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../../core/models/purchase.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  isLoading = false;
  purchases: Purchase[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
