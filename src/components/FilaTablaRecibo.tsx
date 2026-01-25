import type { Recibo } from "../type"

interface Props {
    recibo: Recibo
}

export function FilaTablaRecibo({ recibo }: Props) {
    return (
        <tr>
            <td>{recibo.descripcion}</td>
            <td>{recibo.monto}</td>
            <td>{recibo.pagado}</td>
            <td>{recibo.fecha.toLocaleString()}</td>
        </tr>
    )
}