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

export interface MateriaPrima {
    idProducto:       number;
    materiaPrima:     string;
    descripcion:      string;
    cantidadUtilizar: number;
    unidad:           string;
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

