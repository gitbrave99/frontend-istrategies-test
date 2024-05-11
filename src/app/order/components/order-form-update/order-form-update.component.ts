import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericSimpleList } from '../../../shared/interfaces/generic-simple-list.interfaces';
import { Order, OrderInProgress } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-form-update',
  templateUrl: './order-form-update.component.html',
  styleUrl: './order-form-update.component.css'
})

export class OrderFormUpdateComponent {
  @Input() isUpdateOrderDialogShow:boolean=false;
  @Input() selectedOrder:Order={} as Order;
  @Output() onCloseDialog     = new EventEmitter();
  @Output() onConfirmDialog   = new EventEmitter();
  @Output() onUpdateInProgress= new EventEmitter<{idOrdenProduccion:number, orderInProgres:OrderInProgress}>();
  @Output() onUpdateComplete  = new EventEmitter<{idOrdenProduccion:number, dateComplete:string}>();

  selectedStatusUpdateOrder:number=2;
  orderInProgress:OrderInProgress={} as OrderInProgress
  fechaFinalizacion!:Date;
  fechaEnProduccion:Date=new Date();
  lineaProduccion: GenericSimpleList[] = [{ id: 1, value: "Línea Ropa" }, { id: 2, value: "Línea Gorra" }]
  estadoOrden: GenericSimpleList[] = [{ id: 2, value: "En proceso" }, { id: 3, value: "Finalizada" }]

  closeDialog(){
    this.onCloseDialog.emit();
  }

  confirmDialog(){
    let fechf=""
    console.log("fech inal", this.fechaFinalizacion);
    
    if (this.fechaEnProduccion instanceof Date && !isNaN(this.fechaEnProduccion.getTime())) {
      this.orderInProgress.fechaEnProduccion = this.fechaEnProduccion.toISOString().split("T")[0]
    }
    if (this.fechaFinalizacion instanceof Date && !isNaN(this.fechaFinalizacion.getTime())) {
      fechf = this.fechaEnProduccion.toISOString().split("T")[0]
    }

    if (this.selectedStatusUpdateOrder == 2) {
      this.onUpdateInProgress.emit({idOrdenProduccion:this.selectedOrder.idOrdenProduccion, orderInProgres:this.orderInProgress});
    } else {
      this.onUpdateComplete.emit({idOrdenProduccion:this.selectedOrder.idOrdenProduccion, dateComplete:fechf})
    }
    this.isUpdateOrderDialogShow = false
  }

}
