import { Component, OnInit } from '@angular/core';
import { Order, OrderInProgress, OrderNew, OrderPendingDetail } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { ConfirmationService, MessageService } from 'primeng/api';
import dayjs from 'dayjs';

@Component({
  selector: 'order-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})

export class OrderPageComponent implements OnInit {

  orders: Order[] = []
  loadingTable: boolean = false;
  isNewOrderDialogShow: boolean = false;
  selectedOrderUpdate: Order = {} as Order
  isUpdateOrderDialogShow: boolean = false;
  selectedStatusFilter: number = 0
  dateFilter: Date | null = null;

  constructor(private orderService: OrderService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  clearFilters() {
    this.dateFilter = null
    this.selectedStatusFilter = -1
  }

  setFilters(date: Date, status: number) {
    this.dateFilter = date;
    this.selectedStatusFilter = status
  }

  onFilterByDeliveryDate(date: Date) {
    const datef = dayjs(date).format('YYYY-MM-DD');
    this.dateFilter = date
    console.log("IN DATE DROPDOWN opcion: ", this.selectedStatusFilter, "dat: ", datef);
    if (this.selectedStatusFilter == 0) {
      this.getOrdersByDate(datef)
      return
    }
    this.getFilteredOrders(this.selectedStatusFilter, datef)
  }

  onFilterByStatusChange(event: { originalEvent: Event; value: number }) {
    this.selectedStatusFilter = event.value
    console.log("IN DROPDOWN STATUS opcion: ", this.selectedStatusFilter, "dat: ", this.dateFilter);
    if (this.dateFilter == null) return;
    const datef = dayjs(this.dateFilter).format('YYYY-MM-DD');
    if (event.value === 0) {
      this.getOrdersByDate(datef)
      return;
    }
    this.getFilteredOrders(event.value, datef);
  }

  getFilteredOrders(status: number, date: string) {
    this.orderService.getOrdersByEstusDeliveryDate(status, date).subscribe({
      next: (list) => {
        this.orders = list
      }
    })
  }

  getOrdersByDate(date: string) {
    this.orderService.getOrdersByDate(date).subscribe({
      next: (list) => {
        this.orders = list
      }
    })
  }

  getOrders() {
    this.orderService.getOrders()
      .subscribe({
        next: (rOrders) => {
          this.orders = rOrders;
        }
      })
    this.loadingTable = false;
  }

  save(newOrder: OrderPendingDetail) {
    this.orderService.save(newOrder).subscribe({
      next: (dt: ApiResponse) => {
        if (dt.code == 200 && dt.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Orden ingresada', life: 3000 });
        }
      },
      error: (e: ApiResponse) => {
        console.log("error", e);
        let errorMessage = 'Orden no ingresada';
        if (e.data) {
          Object.keys(e.data).forEach(key => {
            errorMessage += ` -  ${e.data[key]}`;
          });
        }
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: errorMessage, life: 9000 });
      },
      complete: () => {
        this.getOrders();
      }
    })
    this.hideNewOrderDialog()
  }

  showUpdateOrderDialog(order: Order) {
    this.selectedOrderUpdate = order
    this.isUpdateOrderDialogShow = true;
  }

  updateOrderComplete(idOrdenProduccion: number, dateComplete: string) {
    this.orderService.updateInComplete(idOrdenProduccion, dateComplete).subscribe({
      next: (dt) => {
        if (dt.code == 200 && dt.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: dt.message, life: 3000 });
        }
      },
      error: (e: ApiResponse) => {
        console.log("error", e);

        let errorMessage = 'Orden no actualizada';
        if (e.data) {
          Object.keys(e.data).forEach(key => {
            errorMessage += ` - ${key}: ${e.data[key]}`;
          });
        }
        
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: errorMessage, life: 9000 });

      },
      complete: () => {
        this.getOrders();
        this.selectedOrderUpdate = {} as Order
      }
    })
  }

  updateOrderInProgress(idOrdenProduccion: number, orderInProgres: OrderInProgress) {
    this.orderService.updateInProgress(idOrdenProduccion, orderInProgres).subscribe({
      next: (dt) => {
        if (dt.code == 200 && dt.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Orden actualizada', life: 3000 });
        }
      },
      error: (e: ApiResponse) => {
        console.log("error", e);
        let errorMessage = 'Orden no actualizada';
        if (e.data) {
          Object.keys(e.data).forEach(key => {
            errorMessage += ` - ${key}: ${e.data[key]}`;
          });
        }
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: errorMessage, life: 9000 });
      },
      complete: () => {
        this.getOrders();
      }
    })
  }

  hideUpdateOrderDialog() {
    this.isUpdateOrderDialogShow = false;
  }

  showNewOrderDialog() {
    this.isNewOrderDialogShow = true;
  }

  hideNewOrderDialog() {
    this.isNewOrderDialogShow = false;
  }

}

