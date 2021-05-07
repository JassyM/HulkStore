import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.scss']
})
export class PurchaseCreateComponent implements OnInit {

  formAddProduct: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.createFormProduct();
  }

  ngOnInit(): void {
  }

  createFormProduct(): void {
    this.formAddProduct = this.formBuilder.group({
      idProduct: new FormControl('', [ Validators.required]),
      units: new FormControl('', [ Validators.required])
    });
  }

  addProduct() {

  }

  openModal(templateRef: TemplateRef<any>) {
    console.log(templateRef);
    this.dialog.open(templateRef);
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
