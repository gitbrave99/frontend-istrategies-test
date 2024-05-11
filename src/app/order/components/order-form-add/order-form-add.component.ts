import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderNew } from '../../interfaces/order.interface';
import { GenericSimpleList } from '../../../shared/interfaces/generic-simple-list.interfaces';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { OrderService } from '../../services/order.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-form-add',
  templateUrl: './order-form-add.component.html',
  styleUrl: './order-form-add.component.css'
})
export class OrderFormAddComponent {
  
  @Input() isNewOrderDialogShow:boolean=false;
  @Output() onHideNewOrderDialog= new EventEmitter()
  @Output() onConfirmDialog= new EventEmitter<OrderNew>()

  orderNew: OrderNew = {} as OrderNew
  fechaEntrega:Date=new Date()
  tipoProductoSolicitado: GenericSimpleList[] = [{ id: 1, value: "Camisas" }, { id: 2, value: "Gorras" }, { id: 3, value: "Uniformes deportivos" }]
  
  constructor(private orderService: OrderService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  closeDialog(){
    this.onHideNewOrderDialog.emit()
  }
  
  confirmDialog(){
    if (this.fechaEntrega instanceof Date && !isNaN(this.fechaEntrega.getTime())) {
      this.orderNew.fechaEntrega = this.fechaEntrega.toISOString().split("T")[0]
    }
    this.onConfirmDialog.emit(this.orderNew)
  }
  
}
