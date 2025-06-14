import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ControlMode from "./pages/ControlMode.jsx";
import SensorData from "./components/SensorData.jsx";
import VoiceControl from "./pages/VoiceControl.jsx";
import PictureControl from "./pages/PictureControl.jsx";
import AutoMode from "./pages/AutoMode.jsx";
import Map from "./components/Map.jsx";
import ObjectFollow from "./pages/ObjectFollow.jsx";
import "./App.css";
import './css/webstyle.css';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Routes>
              <Route path="/" element={<ControlMode />} />
              <Route path="/controlmode" element={<ControlMode />} />
              <Route path="/voicecontrol" element={<VoiceControl />} />
              <Route path="/picturecontrol" element={<PictureControl />} />
              <Route path="/automode" element={<AutoMode />} />
              <Route path="/objectfollow" element={<ObjectFollow />} />
            </Routes>
            <div className="mt-6">
            </div>
          </div>
          <div className="mt-6">
            <SensorData />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;