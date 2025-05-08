import React, { useRef, useEffect, useState } from "react";
import { db, ref, set } from "../firebase/config"; // Đảm bảo đã có file config firebase

export default function ControlByImage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("🔌 Đang kết nối WebSocket...");
  const [result, setResult] = useState("Chưa phát hiện");
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  // Thiết lập WebSocket khi mount
  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:5000/ws");

    ws.onopen = () => {
      setStatus("✅ Đã kết nối WebSocket");
      setConnected(true);
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.error) {
        setStatus("❌ Lỗi: " + data.error);
      } else {
        setResult(data.description || "Không rõ");
        setStatus(data.detected ? "📸 Đã phát hiện vật thể" : "🔍 Không phát hiện");
      }
    };

    ws.onerror = () => {
      setStatus("⚠️ Kết nối bị lỗi");
    };

    ws.onclose = () => {
      setStatus("❌ Kết nối đã đóng");
      setConnected(false);
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  // Truy cập camera và gửi ảnh định kỳ
  useEffect(() => {
    let isMounted = true;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (isMounted) {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        // Nếu đã unmount, dừng stream ngay lập tức
        stream.getTracks().forEach(track => track.stop());
      }
    });

    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current || !connected || !socket) return;

      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);

      const dataURL = canvasRef.current.toDataURL("image/jpeg");
      socket.send(dataURL);
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [connected, socket]);

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-frame">
        📷 Điều khiển bằng hình ảnh
      </h1>

      <div className="relative border-4 border-red-500 rounded-lg overflow-hidden shadow-lg">
        <video ref={videoRef} autoPlay muted className="w-[360px] h-[270px] bg-black" />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      <div className="mt-4 bg-white p-4 shadow rounded-md max-w-md w-full space-y-2">
        <p className="text-frame">🧠 Kết quả nhận dạng: <strong>{result}</strong></p>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
}
