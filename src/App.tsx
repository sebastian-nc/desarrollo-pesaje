import './App.css'
import { FormularioRecibo } from './components/FormularioRecibo'

function App() {

  function handleAgregar(monto: number, descripcion: string, pagado: boolean) {
    console.log(monto, descripcion, pagado)
  }

  return (
    <>
      <h1>Gestor de recibos</h1>
      <FormularioRecibo onAgregar={handleAgregar} />

    </>
  )
}

export default App
