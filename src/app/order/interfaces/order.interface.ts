export interface Order {
    idOrdenProduccion:      number;
    cliente:                string;
    fechaEntrega:           Date;
    tipoProductoSolicitado: string;
    cantidadSolicitada:     number;
    estado:                 string;
    fechaEnProduccion:      Date;
    tipoLineaProduccion:    string;
    fechaFinalizacion:      Date;
    materiaPrima:           MateriaPrima[];
}


export interface OrderNew {
    cliente:                  string;
    fechaEntrega:             string;
    idTipoProductoSolicitado: number;
    cantidadSolicitada:       number;
}

export interface OrderInProgress {
    fechaEnProduccion: string;
    idTipoLinea:       number;
}

// ordene en pendiente
export interface OrderPendingDetail {
    cliente:                  string;
    idTipoProductoSolicitado: number;
    cantidadSolicitada:       number;
    fechaEntrega:             string;
    materiaPrima:             MateriaPrima[];
}

export interface MateriaPrima {
    idProducto:       number;
    materiaPrima:     string;
    descripcion:      string;
    cantidadUtilizar: number;
    unidad:           string;
}
