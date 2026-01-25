import type { Recibo } from "../type";
import { FilaTablaRecibo } from "./FilaTablaRecibo";

interface Props {
    recibos: Recibo[];
    onEliminar: (id: string) => void;
    isEliminar: boolean;
}

export function TablaRecibos({ recibos, onEliminar, isEliminar }: Props) {
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
                        return <FilaTablaRecibo key={recibo.id} recibo={recibo} isEliminar={isEliminar} onEliminar={onEliminar} />
                    })
                }
            </tbody>
        </table>
    )
}