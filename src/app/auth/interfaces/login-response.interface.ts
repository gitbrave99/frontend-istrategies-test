export interface LoginResponse {
    message: string;
    success: boolean;
    code:    number;
    error:   boolean;
    data:    DataResponse;
}

export interface DataResponse {
    tipousuario: number;
    usuario:     string;
    token:       string;
}
