import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MateriaPrima, Order, OrderNew, OrderPendingDetail } from '../../interfaces/order.interface';
import { GenericSimpleList } from '../../../shared/interfaces/generic-simple-list.interfaces';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ConfirmationService, MessageService } from 'primeng/api';
import dayjs from 'dayjs';
import { ProductService } from '../../../product/services/product.service';
import { Product } from '../../../product/interface/product.interface';

@Component({
  selector: 'app-order-form-add',
  templateUrl: './order-form-add.component.html',
  styleUrl: './order-form-add.component.css'
})
export class OrderFormAddComponent implements OnInit {

  @Input() isNewOrderDialogShow: boolean = false;
  @Output() onHideNewOrderDialog = new EventEmitter()
  @Output() onConfirmDialog = new EventEmitter<OrderPendingDetail>()

  orderNew: OrderPendingDetail = {} as OrderPendingDetail
  fechaEntrega: Date | null = null
  tipoProductoSolicitado: GenericSimpleList[] = [{ id: 1, value: "Camisas" }, { id: 2, value: "Gorras" }, { id: 3, value: "Uniformes deportivos" }]

  materiaPrima: Product[] = []
  matPrimaListSelected: MateriaPrima[] = []
  matPrimaAddSelected: Product = {} as Product
  cantToUse: number = 0;
  matNameSelected: string = ""

  matPrimaModSelected: Product = {} as Product
  matPrimaNew: MateriaPrima = {} as MateriaPrima
  matNameModSelected: string = ""
  cantToUseMod: number = 0;

  get materiaPrimaList() {
    return [...this.materiaPrima]
  }

  constructor(private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getMateriaPrima()
  }

  getMateriaPrima() {
    this.productService.getProductByType(2).subscribe({
      next: (resp) => {
        this.materiaPrima = resp;
      },
      error: (error) => {
        this.materiaPrima = []
      }
    })
  }

  closeDialog() {
    this.onHideNewOrderDialog.emit()
  }

  confirmDialog() {
    this.orderNew.fechaEntrega = dayjs(this.fechaEntrega).format('YYYY-MM-DD');
    this.orderNew.materiaPrima= this.matPrimaListSelected
    console.log("order data sent? ", this.orderNew);
    
    this.onConfirmDialog.emit(this.orderNew)
    this.orderNew = {} as OrderPendingDetail
    this.fechaEntrega = null
  }

  selectMateriaPrima(prod: Product) {
    this.matNameSelected = prod.nombre;
    this.matPrimaAddSelected = prod
  }

  addMatPrima() {
    this.matPrimaNew.idProducto = this.matPrimaAddSelected.idProducto
    this.matPrimaNew.materiaPrima = this.matPrimaAddSelected.nombre
    this.matPrimaNew.unidad = this.matPrimaAddSelected.unidad
    this.matPrimaNew.cantidadUtilizar = this.cantToUse

    this.productService.getProductByIdCantToUse(this.matPrimaAddSelected.idProducto, this.cantToUse).subscribe({
      next: (resp) => {
        this.matPrimaListSelected.push(this.matPrimaNew);
        this.matPrimaAddSelected = {} as Product
        this.matPrimaNew = {} as MateriaPrima
        this.cantToUse = 0
        this.matNameSelected = ""
      },
      error: (error: ApiResponse) => {
        console.log("msnaej erro< ", error);
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.message, life: 9000 });
      }
    })
    // this.matPrimaAddSelected.existencia = this.cantToUse
  }

  modMatPrima() {
    this.productService.getProductByIdCantToUse(this.matPrimaModSelected.idProducto, this.cantToUseMod).subscribe({
      next: (resp) => {
        this.matPrimaListSelected.forEach((prod: MateriaPrima) => {
          if (prod.idProducto == this.matPrimaModSelected.idProducto) {
            prod.cantidadUtilizar = this.cantToUseMod
          }
        })
        this.matPrimaModSelected = {} as Product
        this.cantToUseMod = 0
        this.matNameModSelected = ""
      },
      error: (error: ApiResponse) => {
        console.log("msnaej erro< ", error);
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.message, life: 9000 });
      }
    })
  }

  selectModMateriaPrima(prod: Product) {
    this.matNameModSelected = prod.nombre;
    this.matPrimaModSelected = prod
    this.cantToUseMod = prod.existencia
  }

  deleteMateriaPrima(pProd: Product) {
    this.matPrimaListSelected = this.matPrimaListSelected.filter((prod: MateriaPrima) => prod.idProducto != pProd.idProducto)
  }

}