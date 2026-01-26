interface Props {
    onAgregar: (monto: number, descripcion: string, pagado: boolean) => void;
}

export function FormularioRecibo({ onAgregar }: Props) {

    function guardarFormulario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const montoValue = form.get("monto");
        const monto = montoValue ? Number(montoValue) : 0;
        const descripcion = form.get("descripcion") as string;
        const pagado = form.get("pagado") !== null;

        onAgregar(monto, descripcion, pagado);
        e.currentTarget.reset();

    }


    return (
        <form onSubmit={guardarFormulario}>
            <label htmlFor="monto">
                Monto
                <input type="number" name="monto" placeholder="50.60" required />
            </label>
            <label htmlFor="descripcion">
                Descripcion
                <input type="text" name="descripcion" placeholder="Recibo de gas" required />
            </label>
            <label htmlFor="pagado">
                Pagado
                <input type="checkbox" name="pagado" />
            </label>
            <button type="submit">Guardar"</button>
        </form>
    )
}