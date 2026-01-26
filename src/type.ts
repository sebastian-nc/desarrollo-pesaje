export interface Recibo {
    id: string;
    monto: number;
    descripcion: string;
    pagado: boolean;
    fecha: Date
}

export interface PropReciboActualizar {
    id: string;
    cambios: Partial<Omit<Recibo, 'fecha' | 'id'>>
}