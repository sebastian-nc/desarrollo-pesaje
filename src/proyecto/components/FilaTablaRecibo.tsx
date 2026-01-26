import { useState } from "react";
import type { PropReciboActualizar, Recibo } from "../type"

interface Props {
    recibo: Recibo
    onEliminar: (id: string) => void;
    isEliminar: boolean;
    onActualizar: ({ id, reciboValue }: PropReciboActualizar) => void;
}

export function FilaTablaRecibo({ recibo, isEliminar, onEliminar, onActualizar }: Props) {
    const [isEditar, setIsEditar] = useState(false);
    const [reciboValue, setReciboValue] = useState(recibo);

    function actulizarValue(key: keyof PropReciboActualizar["reciboValue"], value: string) {
        const reciboActualizado = { ...recibo, [key]: value };
        onActualizar({ id: recibo.id, reciboValue: reciboActualizado })
        setReciboValue({ ...reciboActualizado })
    }

    return (
        <tr>
            <td>
                {!isEditar ? recibo.descripcion :
                    (
                        <input type="text" value={reciboValue.descripcion} onChange={(e) => actulizarValue("descripcion", e.target.value)} />
                    )
                }
            </td>
            <td>
                {!isEditar ? recibo.monto : ''}
            </td>
            <td>
                {!isEditar ? (recibo.pagado ? "✅" : "❎") : ''}
            </td>
            <td>
                {recibo.fecha.toLocaleString()}
            </td>
            {isEliminar && <td><button onClick={() => onEliminar(recibo.id)}>✖️</button></td>}
            <td><button onClick={() => setIsEditar((prev) => !prev)}>{!isEditar ? "✏️" : "Cerrar"}</button></td>
        </tr>
    )
}