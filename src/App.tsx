import { useState } from 'react'
import './App.css'
import { FormularioRecibo } from './components/FormularioRecibo'
import { TablaRecibos } from './components/TablaRecibos'
import type { Recibo } from './type'

function App() {

  const [recibos, setRecibos] = useState<Recibo[]>([{ id: crypto.randomUUID(), descripcion: "recibo gas", monto: 10.50, pagado: false, fecha: new Date() }])

  function handleAgregar(monto: number, descripcion: string, pagado: boolean) {
    console.log(monto, descripcion, pagado)
  }

  return (
    <>
      <h1>Gestor de recibos</h1>
      <FormularioRecibo onAgregar={handleAgregar} />
      <TablaRecibos recibos={recibos} />
    </>
  )
}

export default App
