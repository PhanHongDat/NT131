import { useEffect, useState } from "react";
import { Joystick } from "react-joystick-component";
import { db, ref, set } from "../firebase/config";

function ControlMode() {
  const [status, setStatus] = useState("Đang chờ lệnh...");

  function handleMove(event) {
    console.log("Moving:", event);
    setStatus(`Đang di chuyển hướng: ${event.direction}`);
    set(ref(db, "commands/direction"), event.direction);
  }
  // Thực hiện gửi ID của Page đến firebase
  function functionID() {
    set(ref(db, "ID/"), "controlmode");
  }
  // Hàm thực hiện gửi
  useEffect(() => {
    functionID();
  }, []);

  function handleStop() {
    console.log("Stopping");
    setStatus("Đã dừng xe");
    set(ref(db, "commands/direction"), "stop");
  }
  // Thêm hàm điều khiển sử dụng bàn phím
  const handleKeyDown = (e) => {
    switch (e.key)
    {
      case "ArrowUP":
      case "W":
      case "w": 
      set(ref(db, "commands/direction"), "FORWARD");
      break;
      case "ArrowDOWN":
      case "S":
      case "s":
      set(ref(db, "commands/direction"), "BACKWARD");
      break;
      case "ArrowLEFT":
      case "A":
      case "a":
      set(ref(db, "commands/direction"), "LEFT");
      break;
      case "ArrowRIGHT":  
      case "D":
      case "d":
      set(ref(db, "commands/direction"), "RIGHT");
      break;
      case " ":
      case "Space":
      set(ref(db, "commands/direction"), "STOP");
      break;
      default:
      break;
    }
  }
  useEffect(() => {
    // Thêm sự kiện lắng nghe bàn phím
    window.addEventListener("keydown", handleKeyDown);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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