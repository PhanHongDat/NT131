import { useState } from "react";
import { Joystick } from "react-joystick-component";
import { db, ref, set } from "../firebase/config";

function ControlMode() {
  const [status, setStatus] = useState("Đang chờ lệnh...");

  function handleMove(event) {
    console.log("Moving:", event);
    setStatus(`Đang di chuyển hướng: ${event.direction}`);
    set(ref(db, "commands/direction"), event.direction);
  }

  function handleStop() {
    console.log("Stopping");
    setStatus("Đã dừng xe");
    set(ref(db, "commands/direction"), "stop");
  }

  return (
    <div className="p-4">
      <h1 className="text-frame">Chế độ điều khiển</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Joystick
          size={150}
          baseColor="lightgray"
          stickColor="red"
          move={handleMove}
          stop={handleStop}
          
        />

        <button
          onClick={handleStop}
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          Dừng xe
        </button>

        <div className="w-full bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Trạng thái:</h2>
          <p className="text-gray-700">{status}</p>
        </div>
      </div>
    </div>
  );
}

export default ControlMode;