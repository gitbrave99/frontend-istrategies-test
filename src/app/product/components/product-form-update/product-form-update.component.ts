import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, ProductUpdate } from '../../interface/product.interface';
import { ProductStatus } from '../../interface/product-status';

@Component({
  selector: 'app-product-form-update',
  templateUrl: './product-form-update.component.html',
  styleUrl: './product-form-update.component.css'
})
export class ProductFormUpdateComponent {
  status: ProductStatus[] = [{ id: 1, status: "Activo" }, { id: 2, status: "Inactivo" }]
  @Input() isOpenDialog: boolean = false;
  @Input() selectedProductUpdate: ProductUpdate = {} as ProductUpdate
  @Output() onCloseDialog = new EventEmitter();
  @Output() onAcceptDialog = new EventEmitter();

  onHideDialog() {
    this.onCloseDialog.emit()
  }

  updateProductDialog() {
    console.log("producto: ", this.selectedProductUpdate);
    this.onAcceptDialog.emit() 
  }

}
