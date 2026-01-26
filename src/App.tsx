import { useState } from 'react'
import './App.css'
import { FormularioRecibo } from './components/FormularioRecibo'
import { TablaRecibos } from './components/TablaRecibos'
import type { PropReciboActualizar, Recibo } from './type'




function App() {

  const [recibos, setRecibos] = useState<Recibo[]>([{ id: crypto.randomUUID(), descripcion: "recibo gas", monto: 10.50, pagado: true, fecha: new Date() }])
  const [isEliminar, setIsEliminar] = useState(false);

  function handleAgregar(monto: number, descripcion: string, pagado: boolean) {
    const nuevoRecibo = { id: crypto.randomUUID(), descripcion, monto, pagado, fecha: new Date() }
    setRecibos((prev) => [...prev, nuevoRecibo])
  }

  function handleEliminar(id: string) {
    setRecibos(recibos.filter((recibo) => recibo.id !== id))
  }

  function handleActualizar({ id, cambios }: PropReciboActualizar) {

    setRecibos((prev) => prev.map((recibo) => {
      if (recibo.id === id) {
        return { ...recibo, ...cambios }
      }
      return recibo
    }))

  }

  return (
    <>
      <h1>Gestor de recibos</h1>
      <div>
        <button onClick={() => setIsEliminar((prev) => !prev)}>Eliminar</button>
      </div>
      <FormularioRecibo onAgregar={handleAgregar} />
      <TablaRecibos recibos={recibos} onEliminar={handleEliminar} isEliminar={isEliminar} onActualizarRecibo={handleActualizar} />
    </>
  )
}

export default App
