import SensorTable from './components/SensorTable';
import SensorChart from './components/SensorChart';
import HumedadAmbienteChart from './components/HumedadAmbienteChart';
import HumedadSueloChart from './components/HumedadSueloChart';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Monitor de Sensores Arduino</h1>
      <SensorChart />
      <HumedadAmbienteChart />
      <HumedadSueloChart />
      <SensorTable />
    </div>
  );
}

export default App;
