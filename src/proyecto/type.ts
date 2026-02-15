export interface Recibo {
    id: string;
    descripcion: string;
    monto: number;
    pagado: boolean;
    fecha: Date;
}

export interface PropReciboActualizar {
    id: string;
    reciboValue: Partial<Recibo>;
}
