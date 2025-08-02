import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const HumedadSueloChart = () => {
  const [datos, setDatos] = useState([]);
  const [limite, setLimite] = useState(10);

  useEffect(() => {
  const obtenerDatos = () => {
    axios.get("http://localhost:8000/api/datos/")
      .then((res) => {
        const datosTransformados = res.data.map((registro) => ({
          fecha: new Date(registro.fecha).toLocaleTimeString(),
          humedad_suelo: registro.humedad_suelo,
        }));
        setDatos(datosTransformados);
      })
      .catch((err) => console.error("Error al obtener datos:", err));
  };

  obtenerDatos(); // cargar inmediatamente
  const intervalo = setInterval(obtenerDatos, 10000); // cada 10 segundos

  return () => clearInterval(intervalo); // limpieza
}, []);
  const datosFiltrados = datos.slice(-limite);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Humedad del Suelo (%)</h2>

      <div className="mb-4 flex justify-end">
        <label className="text-sm font-medium text-gray-600 mr-2">Mostrar:</label>
        <select
          className="border rounded px-2 py-1"
          value={limite}
          onChange={(e) => setLimite(Number(e.target.value))}
        >
          <option value={5}>Últimos 5</option>
          <option value={10}>Últimos 10</option>
          <option value={20}>Últimos 20</option>
          <option value={50}>Últimos 50</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={datosFiltrados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="humedad_suelo" stroke="#16a34a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumedadSueloChart;
