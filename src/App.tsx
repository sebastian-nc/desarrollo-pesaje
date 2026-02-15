import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


function App() {

  // UI State
  const [scaleWeight, setScaleWeight] = useState(0)
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [lastRawData, setLastRawData] = useState<string>("Esperando datos...");

  useEffect(() => {
    // Connect to LOCALHOST to ensure we only get data from THIS machine's scale
    // This isolates clients: Client A talks to Localhost A, Client B talks to Localhost B.
    const socket: Socket = io("http://localhost:8765", {
      transports: ["websocket"], // Force websocket to avoid polling issues with some python servers
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
    });

    socket.on("connect", () => {
      setIsConnected(true);
      setConnectionError(null);
      console.log("Connected to local scale server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from local scale server");
    });

    socket.on("connect_error", (err) => {
      setIsConnected(false);
      setConnectionError("No se encuentra el servidor de balanza (localhost:8765)");
      console.error("Socket connection error:", err);
    });

    // Listen for weight data from Python Script
    socket.on("weight-data", (data: any) => {
      console.log("Datos recibidos:", data);

      // Store raw data for debugging/display
      if (typeof data === 'object') {
        setLastRawData(JSON.stringify(data, null, 2));
      } else {
        setLastRawData(String(data));
      }

      try {
        let weight = 0;
        // Handle different payload formats
        if (typeof data === 'number') {
          weight = data;
        } else if (typeof data === 'string') {
          // Try parsing if it looks like JSON
          if (data.trim().startsWith('{')) {
            try {
              const parsed = JSON.parse(data);
              weight = Number(parsed.weight || parsed.value || 0);
            } catch {
              weight = Number(data);
            }
          } else {
            weight = Number(data);
          }
        } else if (typeof data === 'object' && data !== null) {
          weight = Number(data.weight || data.value || 0);
        }

        if (!isNaN(weight)) {
          setScaleWeight(weight);
        }
      } catch (e) {
        console.error("Error processing weight data:", e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">Gestor de Recibos - Monitor de Balanza</h1>

      <div className="grid gap-6">
        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Estado de Conexión</h2>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
            <span className={`font-medium ${isConnected ? "text-green-700" : "text-red-700"}`}>
              {isConnected ? "Conectado al Servidor (localhost:8765)" : "Desconectado"}
            </span>
          </div>
          {connectionError && (
            <div className="mt-2 text-red-500 text-sm bg-red-50 p-2 rounded">
              Error: {connectionError}
            </div>
          )}
        </div>

        <div className="border p-6 rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Peso Actual</h2>
          <div className="text-6xl font-mono font-bold text-blue-600">
            {scaleWeight.toFixed(2)} <span className="text-2xl text-gray-400">kg</span>
          </div>
        </div>

        <div className="border p-6 rounded-lg shadow-sm bg-slate-50">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Última Trama de Datos Recibida (Raw)</h2>
          <pre className="bg-slate-900 text-green-400 p-4 rounded overflow-auto font-mono text-sm border border-slate-700 h-32">
            {lastRawData}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
