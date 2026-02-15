import { useState } from "react";
import type { PropReciboActualizar, Recibo } from "../type"

interface Props {
    recibo: Recibo
    onEliminar: (id: string) => void;
    onActualizarRecibo: ({ id, cambios }: PropReciboActualizar) => void;
}

export function FilaTablaRecibo({ recibo, onEliminar, onActualizarRecibo }: Props) {
    const [isEditando, setisEditando] = useState(false);

    function actualizarCampo<K extends keyof PropReciboActualizar["cambios"]>(key: K, value: PropReciboActualizar["cambios"][K]) {
        onActualizarRecibo({ id: recibo.id, cambios: { [key]: value } });
    }

    return (
        <tr>
            <td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {!isEditando ? recibo.descripcion :
                    (
                        <input type="text" value={recibo.descripcion} onChange={(e) => actualizarCampo("descripcion", e.target.value)} />
                    )
                }
            </td>
            <td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {!isEditando ? recibo.monto :
                    (
                        <input type="number" value={recibo.monto} onChange={(e) => actualizarCampo("monto", Number(e.target.value))} />
                    )
                }
            </td>
            <td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {!isEditando ? (recibo.pagado ? "✅" : "❎") : <input type="checkbox" checked={recibo.pagado} name="pagado" onChange={(e) => actualizarCampo("pagado", e.target.checked)} />}
            </td>
            <td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {recibo.fecha.toLocaleString()}
            </td>

            <td className="border border-gray-300 p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <div className="flex gap-2">
                    <button
                        onClick={() => setisEditando((prev) => !prev)}>
                        {!isEditando ? <button className="shadow-sm shadow-white/20 p-1">✏️</button> : <button className="shadow-sm shadow-white/20 p-1">❌</button>}
                    </button>
                    <td><button className="shadow-sm shadow-white/20 p-1" onClick={() => onEliminar(recibo.id)}>🧹</button></td>
                </div>

            </td>
        </tr>
    )
}