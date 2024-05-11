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
  selectedProduct: Product = {} as Product
  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  onHideDialog() {
    this.onCloseDialog.emit();
  }

  saveProductDialog() {
    this.productService.save(this.selectedProduct).subscribe({
      next: (dt) => {
        console.log("mensaje= ", dt);
        if (dt.code == 200 && dt.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Ingresado', life: 3000 });
        }
        this.onHideDialog()
      },
      error: (e: ApiResponse) => {
        console.log("error", e);
        let errorMessage = 'Product no ingresado';
        if (e.data) {
          Object.keys(e.data).forEach(key => {
            errorMessage += ` - ${key}: ${e.data[key]}`;
          });
        }
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: errorMessage, life: 9000 });
      }
    })

  }


}
