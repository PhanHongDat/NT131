import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ControlMode from "./pages/ControlMode";
import SensorData from "./components/SensorData.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Routes>
              <Route path="/" element={<ControlMode />} />
              {/* Thêm các route khác sau này */}
            </Routes>
          </div>
          <div className="md:col-span-1">
            <SensorData />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;