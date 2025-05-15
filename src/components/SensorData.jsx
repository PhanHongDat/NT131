// src/components/SensorData.js
import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../firebase/config";
import "../css/webstyle.css"; // Import your CSS file
export default function SensorData() {
  const [data, setData] = useState({
    distance: 0,
    tooClose: false,
    leftObstacle: false,
    rightObstacle: false,
    bothObstacles: false
  });

  useEffect(() => {
    const sensorDataRef = ref(db, "/sensor_data");
    const sensorStateRef = ref(db, "/sensors");
    const systemDataRef = ref(db, "/system");
    onValue(sensorDataRef, (snapshot) => {
      const val = snapshot.val();
      setData((prev) => ({
        ...prev,
        distance: val?.distance || 0,
        tooClose: val?.too_close || false,
      }));
    });

    onValue(sensorStateRef, (snapshot) => {
      const val = snapshot.val();
      setData((prev) => ({
        ...prev,
        leftObstacle: val?.left_obstacle || false,
        rightObstacle: val?.right_obstacle || false,
        bothObstacles: val?.both_obstacles || false,
      }));
    });
    onValue(systemDataRef, (snapshot) => {
      const val = snapshot.val();
      setData((prev) => ({
        ...prev,
        connected_at: val?.connected_at || "Chưa kết nối",
      }));
    });
  }, []);

  return (
    <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Dữ liệu cảm biến</h2>
      <div className="pixel-frame">Trạng thái kết nối: {data.connected_at}</div>
  <div className="pixel-frame">Khoảng cách: {data.distance.toFixed(2)} cm</div>
  <div className="pixel-frame">Gần vật thể: {data.tooClose ? "Có" : "Không"}</div>
  <div className="pixel-frame">Vật cản trái: {data.leftObstacle ? "Có" : "Không"}</div>
  <div className="pixel-frame">Vật cản phải: {data.rightObstacle ? "Có" : "Không"}</div>
  <div className="pixel-frame">Vật cản cả 2 bên: {data.bothObstacles ? "Có" : "Không"}</div>
    </div>
  );
}
