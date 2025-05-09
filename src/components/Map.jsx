import React, { useRef, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/config";

export default function VehiclePath() {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [lastTimestamp, setLastTimestamp] = useState(null);
  const [direction, setDirection] = useState(null);
  const velocity = 10; // cm/s, giả định

  useEffect(() => {
    const movementsRef = ref(db, "movements");
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(position.x, position.y, 3, 0, 2 * Math.PI);
    ctx.fill();

    onValue(movementsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const keys = Object.keys(data).sort((a, b) => a - b);

      let prev = { ...position };
      let currentTime = lastTimestamp || data[keys[0]].timestamp;

      keys.forEach((key) => {
        const { direction, timestamp } = data[key];
        const dt = (timestamp - currentTime) / 1000;
        const distance = velocity * dt;

        let next = { ...prev };
        switch (direction) {
          case "forward": next.y -= distance; break;
          case "backward": next.y += distance; break;
          case "left": next.x -= distance; break;
          case "right": next.x += distance; break;
          default: break;
        }

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();

        prev = next;
        currentTime = timestamp;
      });

      setPosition(prev);
      setLastTimestamp(currentTime);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Đường đi của xe</h2>
      <canvas ref={canvasRef} width={400} height={400} className="border border-black" />
    </div>
  );
}
