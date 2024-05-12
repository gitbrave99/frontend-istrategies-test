import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order, OrderNew } from '../../interfaces/order.interface';
import { GenericSimpleList } from '../../../shared/interfaces/generic-simple-list.interfaces';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { OrderService } from '../../services/order.service';
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
  @Output() onConfirmDialog = new EventEmitter<OrderNew>()

  orderNew: OrderNew = {} as OrderNew
  fechaEntrega: Date | null = null
  tipoProductoSolicitado: GenericSimpleList[] = [{ id: 1, value: "Camisas" }, { id: 2, value: "Gorras" }, { id: 3, value: "Uniformes deportivos" }]

  materiaPrima: Product[] = []
  matPrimaListSelected: Product[] = []
  matPrimaAddSelected: Product = {} as Product
  cantToUse: number = 0;
  matNameSelected: string = ""

  matPrimaModSelected: Product = {} as Product
  matPrimaNew: Product = {} as Product
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
    this.onConfirmDialog.emit(this.orderNew)
    this.orderNew = {} as OrderNew
    this.fechaEntrega = null
  }

  selectMateriaPrima(prod: Product) {
    this.matNameSelected = prod.nombre;
    this.matPrimaAddSelected = prod
  }

  addMatPrima() {
    this.matPrimaNew.idProducto = this.matPrimaAddSelected.idProducto
    this.matPrimaNew.nombre = this.matPrimaAddSelected.nombre
    this.matPrimaNew.unidad = this.matPrimaAddSelected.unidad
    this.matPrimaNew.existencia = this.cantToUse

    this.productService.getProductByIdCantToUse(this.matPrimaAddSelected.idProducto,this.cantToUse).subscribe({
      next: (resp) => {
        console.log("stock ok_+ ", resp.message);
        this.matPrimaListSelected.push(this.matPrimaNew); 
        this.matPrimaAddSelected = {} as Product
        this.matPrimaNew= {} as Product
        this.cantToUse = 0
        this.matNameSelected = ""
      },
      error: (error:ApiResponse) => {
        console.log("msnaej erro< ", error);
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.message, life: 9000 });
      }
    })
    // this.matPrimaAddSelected.existencia = this.cantToUse
  }

  modMatPrima() {
    // implementar logica par modificar 
    this.matPrimaListSelected.forEach((prod: Product) => {
      if (prod.idProducto == this.matPrimaModSelected.idProducto) {
        prod.existencia = this.cantToUseMod
      }
    })
    this.matPrimaModSelected = {} as Product
    this.cantToUseMod = 0
    this.matNameModSelected = ""
  }

  selectModMateriaPrima(prod: Product) {
    this.matNameModSelected = prod.nombre;
    this.matPrimaModSelected = prod
    this.cantToUseMod = prod.existencia
  }
  deleteMateriaPrima(prod:Product){
    this.matPrimaListSelected=this.matPrimaListSelected.filter((prod:Product)=>prod.idProducto!=prod.idProducto)
  }

}
