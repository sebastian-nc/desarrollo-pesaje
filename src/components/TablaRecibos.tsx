import type { Recibo } from "../type";
import { FilaTablaRecibo } from "./FilaTablaRecibo";

interface Props {
    recibos: Recibo[];
}

export function TablaRecibos({ recibos }: Props) {
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
                        return <FilaTablaRecibo key={recibo.id} recibo={recibo} />
                    })
                }
            </tbody>
        </table>
    )
}