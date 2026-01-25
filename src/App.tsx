import { useState } from 'react'
import './App.css'
import { FormularioRecibo } from './components/FormularioRecibo'
import { TablaRecibos } from './components/TablaRecibos'
import type { Recibo } from './type'

function App() {

  const [recibos, setRecibos] = useState<Recibo[]>([{ id: crypto.randomUUID(), descripcion: "recibo gas", monto: 10.50, pagado: false, fecha: new Date() }])
  const [isEliminar, setIsEliminar] = useState(false);

  function handleAgregar(monto: number, descripcion: string, pagado: boolean) {
    console.log(monto, descripcion, pagado)
  }

  function handleEliminar(id: string) {
    setRecibos(recibos.filter((recibo) => recibo.id !== id))
  }

  return (
    <>
      <h1>Gestor de recibos</h1>
      <div>
        <button onClick={() => setIsEliminar((prev) => !prev)}>Eliminar</button>
      </div>
      <FormularioRecibo onAgregar={handleAgregar} />
      <TablaRecibos recibos={recibos} onEliminar={handleEliminar} isEliminar={isEliminar} />
    </>
  )
}

export default App
