import { useState } from "react";
import type { PropReciboActualizar, Recibo } from "../type"

interface Props {
    recibo: Recibo
    onEliminar: (id: string) => void;
    isEliminar: boolean;
    onActualizarRecibo: ({ id, cambios }: PropReciboActualizar) => void;
}

export function FilaTablaRecibo({ recibo, isEliminar, onEliminar, onActualizarRecibo }: Props) {
    const [isEditando, setisEditando] = useState(false);

    function actualizarCampo<K extends keyof PropReciboActualizar["cambios"]>(key: K, value: PropReciboActualizar["cambios"][K]) {
        onActualizarRecibo({ id: recibo.id, cambios: { [key]: value } });
    }

    return (
        <tr>
            <td>
                {!isEditando ? recibo.descripcion :
                    (
                        <input type="text" value={recibo.descripcion} onChange={(e) => actualizarCampo("descripcion", e.target.value)} />
                    )
                }
            </td>
            <td>
                {!isEditando ? recibo.monto :
                    (
                        <input type="number" value={recibo.monto} onChange={(e) => actualizarCampo("monto", Number(e.target.value))} />
                    )
                }
            </td>
            <td>
                {!isEditando ? (recibo.pagado ? "✅" : "❎") : <input type="checkbox" checked={recibo.pagado} name="pagado" onChange={(e) => actualizarCampo("pagado", e.target.checked)} />}
            </td>
            <td>
                {recibo.fecha.toLocaleString()}
            </td>
            {isEliminar && <td><button onClick={() => onEliminar(recibo.id)}>✖️</button></td>}
            <td><button onClick={() => setisEditando((prev) => !prev)}>{!isEditando ? "✏️" : "Cerrar"}</button></td>
        </tr>
    )
}