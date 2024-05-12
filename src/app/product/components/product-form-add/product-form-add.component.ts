import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interface/product.interface';
import { ProductType } from '../../interface/product-type';
import { ProductStatus } from '../../interface/product-status';
import { ProductService } from '../../services/product.service';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-form-add',
  templateUrl: './product-form-add.component.html',
  styleUrl: './product-form-add.component.css'
})
export class ProductFormAddComponent {

  productType: ProductType[] = [{ id: 1, type: "Producto Terminado" }, { id: 2, type: "Materia Prima" }]
  status: ProductStatus[] = [{ id: 1, status: "Activo" }, { id: 2, status: "Inactivo" }]

  @Input() isOpenDialod: boolean = false;
  @Output() onCloseDialog = new EventEmitter();
  @Output() onNewProduct = new EventEmitter<Product>()
  selectedProduct: Product = {} as Product

  hideDialog() {
    this.onCloseDialog.emit();
  }

  confirmDialog() {
    this.onNewProduct.emit(this.selectedProduct)
  }

}
