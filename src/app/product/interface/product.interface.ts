export interface Product {
    idProducto:  number;
    nombre:      string;
    descripcion: string;
    tipo:        string;
    unidad:      string;
    existencia:  number;
    estado:      string;
}


export interface ProductUpdate {
    idProducto:  number;
    descripcion: string;
    existencia:  number;
    idestado:    number;
}



export interface Product2 {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    first:            boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    empty:            boolean;
}

export interface Content {
    idProducto:  number;
    nombre:      string;
    descripcion: string;
    tipo:        string;
    unidad:      string;
    existencia:  number;
    estado:      string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}
