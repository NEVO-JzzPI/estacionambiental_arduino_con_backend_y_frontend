import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const SensorTable = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/datos/")
      .then((res) => setDatos(res.data))
      .catch((err) => console.error("Error al obtener datos:", err));
  }, []);


  const exportarCSV = () => {
    if (datos.length === 0) return;

    const encabezado = "Fecha,Movimiento,Temperatura,Humedad Ambiente,Humedad Suelo\n";
    const filas = datos.map((registro) => {
      return [
        new Date(registro.fecha).toLocaleString(),
        registro.temperatura,
        registro.humedad_ambiente,
        registro.humedad_suelo
      ].join(",");
    });

    const contenido = encabezado + filas.join("\n");
    const blob = new Blob([contenido], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "registros_sensores.csv");
    };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Registros de Sensores</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-sm rounded-lg bg-white">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Temperatura (°C)</th>
              <th className="p-3 text-left">Humedad Ambiente (%)</th>
              <th className="p-3 text-left">Humedad del Suelo (%)</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {datos.map((registro, index) => (
              <tr key={index} className="hover:bg-gray-100 border-b transition-colors">
                <td className="p-3">{new Date(registro.fecha).toLocaleString()}</td>
                <td className="p-3">{registro.temperatura}</td>
                <td className="p-3">{registro.humedad_ambiente}</td>
                <td className="p-3">{registro.humedad_suelo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center  m-4  ">
      <button
        onClick={exportarCSV}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow transition delay-150 ">
         Exportar CSV
      </button>
    </div>

  </div>
    
  );
  


};

export default SensorTable;
