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
        <form onSubmit={guardarFormulario} className="border p-3 rounded-2xl mx-auto flex flex-col gap-2 w-75 shadow-lg">
            <label htmlFor="monto" className="inline-flex items-center gap-2">
                Monto
                <input type="number" name="monto" placeholder="50.60" required className="p-2" />
            </label>
            <label htmlFor="descripcion" className="inline-flex items-center gap-2">
                Descripcion
                <input type="text" name="descripcion" placeholder="Recibo de gas" required className="p-2" />
            </label>
            <label htmlFor="pagado" className="inline-flex items-center gap-2">
                Pagado
                <input type="checkbox" name="pagado" />
            </label>
            <button type="submit" className="border px-4 py-2 bg-blue-500 text-white rounded-lg">Guardar</button>
        </form>
    )
}