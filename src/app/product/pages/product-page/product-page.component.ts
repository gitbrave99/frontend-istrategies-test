import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../services/product.service';
import { Product, ProductUpdate } from '../../interface/product.interface';
import { ProductType } from '../../interface/product-type';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  isNewProductoDialogShow: boolean = false;
  isUpdateProductDialogShow: boolean = false;
  selectedProductUpdate: ProductUpdate = {} as ProductUpdate
  productsList: Product[] = [] as Product[]
  isLoadingTable: boolean = true;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  showNewProductDialog() {
    this.isNewProductoDialogShow = true;
  }

  hideNewProductDialog() {
    this.isNewProductoDialogShow = false;
  }

  hideUpdateProductDialog() {
    this.isUpdateProductDialogShow = false;
  }

  getProducts() {
    this.productService.getProduct()
      .subscribe({
        next: (rProducts) => {
          this.productsList = rProducts
        },
        complete: () => {
          this.isLoadingTable = false;
        },
      })
  }

  updateProductDialog() {
    this.productService.update(this.selectedProductUpdate).subscribe({
      next: (dt) => {
        if (dt.code == 200 && dt.success == true) {
          console.log("EJEMCUANDOT  ", dt);
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto actualizado', life: 3000 });
          // this.getProducts()
        }
      },
      error: (e: ApiResponse) => {
        console.log("error", e);
        let errorMessage = 'Product no actualizado';
        if (e.data) {
          Object.keys(e.data).forEach(key => {
            errorMessage += ` - ${key}: ${e.data[key]}`;
          });
        }
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: errorMessage, life: 9000 });
      },
      complete: () => {
        this.getProducts();
      }
    })
    this.isUpdateProductDialogShow = false
  }

  deleteSelectedProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct(product.idProducto)
      }
    });
  }

  deleteProduct(idproduct: number) {
    this.productService.delete(idproduct).subscribe({
      next: (resp) => {
        if (resp.code===200) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: resp.message, life: 9000 });
          return
        }
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: resp.message, life: 9000 }); 
      },
      error: (e: ApiResponse) => {
        console.log("error", e);
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: e.message, life: 9000 });
      },
      complete: () => {
        this.getProducts()
      }
    })
  }


  saveProductDialog(newProduct: Product) {
    this.productService.save(newProduct).subscribe({
      next: (dt) => {
        console.log("mensaje= ", dt);
        if (dt.code == 200 && dt.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Ingresado', life: 3000 });
        }
        this.hideNewProductDialog();
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
      },
      complete: () => {
        this.getProducts()
      }
    })
  }

  onFilterByTipoChange(event: { originalEvent: Event; value: number }) {
    if (event.value === 0) {
      this.getProducts();
      return;
    }
    this.productService.getProductByType(event.value).subscribe({
      next: (list) => {
        this.productsList = list
      }
    })
  }

  showUpdateProductDialog(product: Product) {
    this.selectedProductUpdate.idProducto = product.idProducto;
    this.selectedProductUpdate.descripcion = product.descripcion;
    this.selectedProductUpdate.existencia = product.existencia;
    this.selectedProductUpdate.idestado = this.getIdEstadoProducto(product.estado);
    this.isUpdateProductDialogShow = true;
  }

  getIdEstadoProducto(estado: string): number {
    if (estado == "Activo") return 1;
    if (estado == "Inactivo") return 2;
    return 0;
  }

}
