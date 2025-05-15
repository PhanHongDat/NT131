import React, { useRef, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/config";

export default function VehiclePath() {
  const canvasRef = useRef(null);
  const positionRef = useRef({ x: 200, y: 200 }); // bắt đầu từ giữa canvas
  const velocity = 10; // cm/s hoặc pixel/s tuỳ chỉnh scale phù hợp

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas lần đầu
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ điểm bắt đầu
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(positionRef.current.x, positionRef.current.y, 3, 0, 2 * Math.PI);
    ctx.fill();

    const movementsRef = ref(db, "movement/latest");

    const unsubscribe = onValue(movementsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || !data.t1 || !data.t2) return;

      const { direction, time } = data.t1;
      const dt = data.t1.time - data.t2.time;
      const distance = velocity * dt;

      const from = { ...positionRef.current };
      const to = { ...from };

      switch (direction) {
        case "FORWARD":  to.y -= distance; break;
        case "BACKWARD": to.y += distance; break;
        case "LEFT":     to.x -= distance; break;
        case "RIGHT":    to.x += distance; break;
        default: return;
      }

      // Vẽ đường đi
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Chấm điểm đến
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(to.x, to.y, 3, 0, 2 * Math.PI);
      ctx.fill();

      // Cập nhật vị trí mới
      positionRef.current = to;
    });

    // Cleanup
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Đường đi của xe</h2>
      <canvas ref={canvasRef} width={400} height={400} className="border border-black" />
    </div>
  );
}
