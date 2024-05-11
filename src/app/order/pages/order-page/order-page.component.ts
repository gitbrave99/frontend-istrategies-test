import { Component, OnInit } from '@angular/core';
import { Order, OrderInProgress, OrderNew } from '../../interfaces/order.interface';
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
  selectedStatusFilter:number=0
  dateFilter:string="";
  

  constructor(private orderService: OrderService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getOrders()
  }
  onFilterByDeliveryDate(date: Date) {
    const datef = dayjs(date).format('YYYY-MM-DD');
    this.dateFilter=datef
    console.log("opcion: ", this.selectedStatusFilter, "dat: ", this.dateFilter);
    if (this.selectedStatusFilter==0) {
      this.getOrdersByDate(datef)
      return
    }
    this.getFilteredOrders(this.selectedStatusFilter,datef)
  }

  onFilterByStatusChange(event: { originalEvent: Event; value: number }) {    
    this.selectedStatusFilter=event.value
    console.log("opcion: ", this.selectedStatusFilter, "dat: ", this.dateFilter);
    if (this.dateFilter=="") return;
    if (event.value === 0) {
      // this.getOrders();
      this.getOrdersByDate(this.dateFilter)
      return;
    }
    this.getFilteredOrders(event.value,this.dateFilter);
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

  save(newOrder: OrderNew) {
    this.orderService.save(newOrder).subscribe({
      next: (dt: ApiResponse) => {
        if (dt.code == 200 && dt.success == true) {
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Orden ingresada', life: 3000 });
        }
      },
      error: (e: ApiResponse) => {
        console.log("error", e);
        let errorMessage = 'Orden no ingresad';
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

  getOrders() {
    this.orderService.getOrders()
      .subscribe({
        next: (rOrders) => {
          this.orders = rOrders;
        }
      })
    this.loadingTable = false;
  }

  showUpdateOrderDialog(order: Order) {
    this.selectedOrderUpdate = order
    this.isUpdateOrderDialogShow = true;
  }

  updateOrderComplete(idOrdenProduccion: number, dateComplete: string) {
    this.orderService.updateInComplete(idOrdenProduccion, dateComplete).subscribe({
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

  getDateFormatted(date: Date):string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes se indexa desde 0, así que se suma 1
    const day = String(date.getDate()).padStart(2, '0'); 
    // Formatear la fecha en el formato YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
}

