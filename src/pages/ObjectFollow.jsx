// src/pages/VoiceControl.jsx hoặc AutoMode.jsx
import React, { useEffect } from "react";
import { db, ref, set } from "../firebase/config";

function AutoMode() {
  // Hàm gửi ID lên Firebase khi vào trang
  function IDFunction() {
    set(ref(db, "ID/"), "objectfollow");
  }

  useEffect(() => {
    IDFunction();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-frame">Chế độ tự động đi theo vật thể</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      </div>
    </div>
  );
}

export default AutoMode;
