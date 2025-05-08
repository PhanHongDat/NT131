// src/pages/VoiceControl.jsx
import React, { useState } from "react";
import { db, ref, set } from "../firebase/config";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceControl() {
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("Chưa nhận lệnh nào");
  const [status, setStatus] = useState("");

  const recognition = new SpeechRecognition();
  recognition.lang = "vi-VN";
  recognition.continuous = false;
  recognition.interimResults = false;

  const startListening = () => {
    setCommand("Đang nghe...");
    recognition.start();
    setListening(true);
  };

  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript.toLowerCase();
    setCommand(speech);
    handleCommand(speech);
    setListening(false);
  };

  recognition.onerror = (event) => {
    setCommand("Lỗi: " + event.error);
    setListening(false);
  };

  const handleCommand = (speech) => {
    let direction = "";
    if (speech.includes("tiến")) direction = "forward";
    else if (speech.includes("lùi")) direction = "backward";
    else if (speech.includes("trái")) direction = "left";
    else if (speech.includes("phải")) direction = "right";
    else if (speech.includes("dừng")) direction = "stop";

    if (direction) {
      set(ref(db, "commands/direction"), direction);
      setStatus(`Gửi lệnh: ${direction}`);
    } else {
      setStatus("Không nhận ra lệnh điều khiển");
    }
  };

  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-frame">🎤 Điều khiển bằng giọng nói</h1>

      <button
        onClick={startListening}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Bấm để nói lệnh
      </button>

      <div className="mt-4 bg-white p-4 shadow rounded-md max-w-md w-full">
        <p className="texr-frame">🗣️ Lệnh nhận: <strong>{command}</strong></p>
        <p className="mt-2 text-gray-700">{status}</p>
      </div>
    </div>
  );
}
