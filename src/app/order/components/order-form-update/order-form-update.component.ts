import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericSimpleList } from '../../../shared/interfaces/generic-simple-list.interfaces';
import { Order, OrderInProgress } from '../../interfaces/order.interface';
import dayjs from 'dayjs';

@Component({
  selector: 'app-order-form-update',
  templateUrl: './order-form-update.component.html',
  styleUrl: './order-form-update.component.css'
})

export class OrderFormUpdateComponent {
  @Input() isUpdateOrderDialogShow: boolean = false;
  @Input() selectedOrder: Order = {} as Order;
  @Output() onCloseDialog = new EventEmitter();
  @Output() onConfirmDialog = new EventEmitter();
  @Output() onUpdateInProgress = new EventEmitter<{ idOrdenProduccion: number, orderInProgres: OrderInProgress }>();
  @Output() onUpdateComplete = new EventEmitter<{ idOrdenProduccion: number, dateComplete: string }>();

  selectedStatusUpdateOrder: number = 2;
  orderInProgress: OrderInProgress = {} as OrderInProgress
  fechaFinalizacion: Date | null = null;
  fechaEnProduccion: Date | null = null;
  lineaProduccion: GenericSimpleList[] = [{ id: 1, value: "Línea Ropa" }, { id: 2, value: "Línea Gorra" }]
  estadoOrden: GenericSimpleList[] = [{ id: 2, value: "En proceso" }, { id: 3, value: "Finalizada" }]

  closeDialog() {
    this.onCloseDialog.emit();
  }

  confirmDialog() {
    let fechf = dayjs(this.fechaFinalizacion).format('YYYY-MM-DD');
    this.orderInProgress.fechaEnProduccion = dayjs(this.fechaEnProduccion).format('YYYY-MM-DD');

    if (this.selectedStatusUpdateOrder == 2) {
      this.onUpdateInProgress.emit({ idOrdenProduccion: this.selectedOrder.idOrdenProduccion, orderInProgres: this.orderInProgress });
    } else {
      console.log("envio> ", fechf);
      this.onUpdateComplete.emit({ idOrdenProduccion: this.selectedOrder.idOrdenProduccion, dateComplete: fechf })
    }
    this.isUpdateOrderDialogShow = false
    this.fechaEnProduccion = null;
    this.fechaFinalizacion = null;
    this.orderInProgress = {} as OrderInProgress
  }

}
