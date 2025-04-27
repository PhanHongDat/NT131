// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Navbar bạn đã có nè
import ControlMode from "./pages/ControlMode";
// (sau sẽ thêm thêm AutoMode, FollowMode,...)

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ControlMode />} /> {/* mặc định vào trang ControlMode */}
        {/* Sau này thêm các chế độ khác tại đây */}
      </Routes>
    </Router>
  );
}

export default App;
