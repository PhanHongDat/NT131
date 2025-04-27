import { useState } from "react";
import Navbar from "./components/Navbar";
import ControlMode from "./pages/ControlMode";

function App() {
  const [mode, setMode] = useState("control"); // "control" | "auto" | "follow"

  const renderPage = () => {
    switch (mode) {
      case "control":
        return <ControlMode />;
      case "auto":
        return <div className="p-8 text-2xl">Chế độ tự lái (Đang phát triển)</div>;
      case "follow":
        return <div className="p-8 text-2xl">Chế độ theo vật thể (Đang phát triển)</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar setMode={setMode} />
      {renderPage()}
    </div>
  );
}

export default App;
