import { useState, useEffect } from "react";
import { Joystick } from "react-joystick-component";
import { db, ref, set, onValue } from "../firebase/config";

function ControlMode() {
  const [status, setStatus] = useState("Đang chờ lệnh...");
  const [distance, setDistance] = useState("Không có dữ liệu");

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

  useEffect(() => {
    const distanceRef = ref(db, "sensors/distance");
    onValue(distanceRef, (snapshot) => {
      const value = snapshot.val();
      if (value !== null) {
        setDistance(`${value} cm`);
      } else {
        setDistance("Không có dữ liệu");
      }
    });
  }, []);

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">Chế độ điều khiển</h1>

      <Joystick
        size={100}
        baseColor="lightgray"
        stickColor="blue"
        move={handleMove}
        stop={handleStop}
      />

      <button
        onClick={handleStop}
        className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        Dừng xe
      </button>

      <div className="mt-8 w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Trạng thái:</h2>
        <p className="text-gray-700">{status}</p>
      </div>

      <div className="mt-4 w-full max-w-md bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Khoảng cách từ cảm biến:</h2>
        <p className="text-gray-700">{distance}</p>
      </div>
    </div>
  );
}

export default ControlMode;
