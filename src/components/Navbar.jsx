function Navbar({ setMode }) {
  return (
    <nav className="flex justify-center gap-4 p-4 bg-gray-800 text-white">
      <button onClick={() => nagivate('/controlmode')} className="hover:bg-gray-600 px-4 py-2 rounded">
        Chế độ điều khiển
      </button>
      <button onClick={() => setMode("auto")} className="hover:bg-gray-600 px-4 py-2 rounded">
        Chế độ tự lái
      </button>
      <button onClick={() => setMode("follow")} className="hover:bg-gray-600 px-4 py-2 rounded">
        Chế độ theo vật thể
      </button>
      <button onClick={() => setMode("voice")} className="hover:bg-gray-600 px-4 py-2 rounded">
        Chế độ điều khiển bằng giọng nói
      </button>
    </nav>
  );
}

export default Navbar;
