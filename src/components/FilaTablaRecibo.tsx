import type { Recibo } from "../type"

interface Props {
    recibo: Recibo
    onEliminar: (id: string) => void;
    isEliminar: boolean;
}

export function FilaTablaRecibo({ recibo, isEliminar, onEliminar }: Props) {
    return (
        <tr>
            <td>{recibo.descripcion}</td>
            <td>{recibo.monto}</td>
            <td>{recibo.pagado}</td>
            <td>{recibo.fecha.toLocaleString()}</td>
            {isEliminar && <td><button onClick={() => onEliminar(recibo.id)}>✖️</button></td>}

        </tr>
    )
}