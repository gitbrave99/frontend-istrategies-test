import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { Product, Product2, ProductUpdate } from '../../interface/product.interface';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ProductType } from '../../interface/product-type';
import { ProductStatus } from '../../interface/product-status';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})

export class ProductTableComponent {
  @ViewChild('dt') dt!: Table;
  @Input("products") products!: Product[];
  @Input() loading: boolean = true;
  productslc: Product[] = [] as Product[]

  searchProduct: string = ""
  filterByTipo: number = 0;
  exportReportLoading: boolean = false;

  productTypeFilter: ProductType[] = [{ id: 0, type: 'Todos' }, { id: 1, type: "Producto Terminado" }, { id: 2, type: "Materia Prima" }]
  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  public filtrar() {
    this.dt.filterGlobal(this.searchProduct, 'contains');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['products'].currentValue) {
        this.productslc = [...changes['products'].currentValue];
        console.log("Lista de productos actualizada en productslc: ", this.productslc);
      }
    }
  }

  @Output() onOpenNewProducDialog = new EventEmitter()
  showNewProductDialog() {
    this.onOpenNewProducDialog.emit()
  }

  @Output() onDeleteProduct = new EventEmitter<Product>()
  deleteSelectedProduct(product: Product) {
    this.onDeleteProduct.emit(product)
  }

  @Output() onOpenUpdateProductDialog = new EventEmitter<Product>()
  showOpenUpdateProductDialog(product: Product) {
    this.onOpenUpdateProductDialog.emit(product);
  }

  onGenerateReport() {
    this.exportReportLoading = true
    this.productService.getReport(this.filterByTipo).subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        // Crear un enlace de descarga y hacer clic en él
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        // Limpiar el objeto URL
        window.URL.revokeObjectURL(url);
        link.remove();  
        // const blob = new Blob([data], { type: 'application/pdf' });
        // const url = window.URL.createObjectURL(blob);
        // const windowTitle = 'Título personalizado de tu PDF';
        // window.open(url, windowTitle); // A
      },
      error: (error) => {
        console.error('Error al descargar el reporte:', error);
      },
      complete:()=>{
        console.log("funcin cocmplete");
        
        this.exportReportLoading = false
      }
    })

  }

  @Output() onFilterByTipoChange = new EventEmitter<{ originalEvent: Event; value: number }>();
  filterListByType(event: { originalEvent: Event; value: number }) {
    this.onFilterByTipoChange.emit(event);
  }

  getSeverityStatus(status: string) {
    switch (status) {
      case 'Inactivo':
        return 'danger';
      case 'Activo':
        return 'success';
      default:
        return undefined;
    }
  }









  // saveProductDialog() {
  //   this.submitted = true;
  //   this.productService.save(this.selectedProduct).subscribe({
  //     next: (dt) => {
  //       console.log("mensaje= ", dt);
  //       if (dt.code == 200 && dt.success == true) {
  //         this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Producto Ingresado', life: 3000 });
  //       }
  //       this.isNewProductoDialogShow = false;
  //     },
  //     error: (e: ApiResponse) => {
  //       console.log("error", e);
  //       let errorMessage = 'Product no ingresado';
  //       if (e.data) {
  //         Object.keys(e.data).forEach(key => {
  //           errorMessage += ` - ${key}: ${e.data[key]}`;
  //         });
  //       }
  //       this.messageService.add({ severity: 'warn', summary: 'Error', detail: errorMessage, life: 9000 });
  //     }
  //   })
  // }


}

