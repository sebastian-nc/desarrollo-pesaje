import type { PropReciboActualizar, Recibo } from "../type";
import { FilaTablaRecibo } from "./FilaTablaRecibo";

interface Props {
    recibos: Recibo[];
    onEliminar: (id: string) => void;
    onActualizarRecibo: ({ id, cambios }: PropReciboActualizar) => void;
}

export function TablaRecibos({ recibos, onEliminar, onActualizarRecibo }: Props) {
    return (
        <table className="w-full border-collapse border border-gray-400 bg-white text-sm dark:border-gray-500 dark:bg-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th className="w-1/4 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200">Monto</th>
                    <th className="w-1/4 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200">Descripcion</th>
                    <th className="w-1/4 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200">Pagado</th>
                    <th className="w-1/2 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200">Creado</th>
                    <th className="w-1/4 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:border-gray-600 dark:text-gray-200">Opcion</th>
                </tr>
            </thead>
            <tbody>
                {
                    recibos.length > 0 ?
                        recibos.map((recibo) => {
                            return <FilaTablaRecibo key={recibo.id} recibo={recibo} onEliminar={onEliminar} onActualizarRecibo={onActualizarRecibo} />
                        })

                        : <tr><td colSpan={5} className="text-center py-5 text-white">No se encontro recibos</td> </tr>

                }

            </tbody>
        </table>
    )
}