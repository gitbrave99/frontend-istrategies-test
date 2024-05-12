import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrderService } from '../../services/order.service';
import { Order, OrderInProgress, OrderNew } from '../../interfaces/order.interface';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import dayjs from 'dayjs';

interface GenericSimpleList {
  id: number,
  value: string
}

@Component({
  selector: 'order-order-table',
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})

export class OrderTableComponent {
  @ViewChild('dt') dt!: Table;
  @Input() loading: boolean = true;
  @Input() orders!: Order[];

  @Output() onReloadTable = new EventEmitter();

  reloadTable() {
    this.onReloadTable.emit()
  }

  ordersList: Order[] = []
  order: Order = {} as Order
  orderNew: OrderNew = {} as OrderNew
  orderInProgress: OrderInProgress = {} as OrderInProgress
  searchOrder: string = ""
  filterDate: Date | null = null;
  exportReportHistoricLoading: boolean = false;
  exportReportLoading: boolean = false;

  lineaProduccion: GenericSimpleList[] = [{ id: 1, value: "Línea Ropa" }, { id: 2, value: "Línea Gorra" }]

  selectedStatusUpdateOrder: number = 2;

  isViewDetPrimaDialogShow: boolean = false;
  orderSelected!: Order;
  submitted: boolean = false;

  statusList: GenericSimpleList[] = [{ id: 0, value: "Todos" }, { id: 1, value: "Pendiente" }, { id: 2, value: "En proceso" }, { id: 3, value: "Finalizada" }]
  selectedStatus: number = -1;

  @Output() onFilterByTipoChange = new EventEmitter<{ originalEvent: Event; value: number }>();
  filterListByType(event: { originalEvent: Event; value: number }) {
    this.onFilterByTipoChange.emit(event);
  }

  @Output() onOpenNewOrderDialog = new EventEmitter();
  onOpenFormAdd() {
    console.log("abriendo");
    this.onOpenNewOrderDialog.emit()
  }

  @Output() onOpenUpdateOrderDialog = new EventEmitter<Order>();
  onOpenFormUpdate(order: Order) {
    this.onOpenUpdateOrderDialog.emit(order);
  }

  @Output() onFilterByDate = new EventEmitter<Date>()
  filterByDate(date: Date) {
    if (this.selectedStatus == -1) {
      return
    }
    this.onFilterByDate.emit(date)
  }

  @Output() onClearFilters = new EventEmitter()
  clearFilters() {
    this.selectedStatus = -1;
    this.filterDate = null;
    this.onClearFilters.emit()
    this.reloadTable();

  }

  constructor(private orderService: OrderService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  public filtrar() {
    console.log("filtrando ", this.searchOrder);
    this.dt.filterGlobal(this.searchOrder, 'contains');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes['orders'].currentValue) {
        this.ordersList = [...changes['orders'].currentValue];
      }
    }
  }

  getReportAll() {
    this.exportReportHistoricLoading = true
    this.orderService.getReportAll().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        // Crear un enlace de descarga y hacer clic en él
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();  
      },
      error: () => {
        console.log("ERROR REPORT ALL");
      },
      complete: () => {
        this.exportReportHistoricLoading = false
      }
    })
  }


  getReportByDate() {
    this.exportReportLoading = true
    const datef = dayjs(this.filterDate).format('YYYY-MM-DD');
    this.orderService.getReportByDate(datef).subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();  
      },
      error: () => {
        console.log("ERROR REPORT ALL");
      }
    })
  }

  getReportFilter() {
    this.exportReportLoading = true
    const datef = dayjs(this.filterDate).format('YYYY-MM-DD');
    console.log("filter: ", this.selectedStatus, datef);
    this.orderService.getReport(this.selectedStatus, datef).subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.pdf');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      },
      error: (error) => {
        console.error('Error al descargar el reporte:', error);
      },
      complete: () => {
        console.log("funcin cocmplete");
        this.exportReportLoading = false
      }
    })
  }



  onGenerateReportHistoric() {
    this.getReportAll()
  }

  onGenerateReport() {
    if (this.filterDate == null) return;
    this.exportReportLoading = true
    if (this.selectedStatus === 0) {
      this.getReportByDate()
    } else {
      this.getReportFilter()
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Pendiente':
        return 'danger';
      case 'En proceso':
        return 'success';
      case 'Finalizada':
        return 'info';
      default:
        return undefined;
    }
  }

  showViewDetPrimaDialog(order: Order) {
    this.isViewDetPrimaDialogShow = true;
  }
  hideViewDetPrimaDialog() {
    this.isViewDetPrimaDialogShow = false;
  }
}
