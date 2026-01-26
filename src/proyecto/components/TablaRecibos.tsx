import type { PropReciboActualizar, Recibo } from "../type";
import { FilaTablaRecibo } from "./FilaTablaRecibo";

interface Props {
    recibos: Recibo[];
    onEliminar: (id: string) => void;
    isEliminar: boolean;
    onActualizar: ({ id, reciboValue }: PropReciboActualizar) => void;
}

export function TablaRecibos({ recibos, onEliminar, isEliminar, onActualizar }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Monto</th>
                    <th>Descripcion</th>
                    <th>Pagado</th>
                    <th>Creado</th>
                </tr>
            </thead>
            <tbody>
                {
                    recibos.map((recibo) => {
                        return <FilaTablaRecibo key={recibo.id} recibo={recibo} isEliminar={isEliminar} onEliminar={onEliminar} onActualizar={onActualizar} />
                    })
                }
            </tbody>
        </table>
    )
}