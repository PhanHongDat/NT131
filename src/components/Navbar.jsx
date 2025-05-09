import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/webstyle.css";

const menuItems = [
  { label: "Chế độ điều khiển", href: "/controlmode" },
  { label: "Chế độ tự lái", href: "/automode" },
  { label: "Chế độ điều khiển bằng ảnh", href: "/picturecontrol" },
  { label: "Điều khiển giọng nói", href: "/voicecontrol" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-700 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-2 pb-4 px-4">
        {/* Hamburger menu (mobile) */}
       
        

        {/* Main menu */}
        <div
          className={`w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul style={{
            display: "flex",
            flexDirection: "row",
            background: "rgba(31,41,55,0.95)",
            borderRadius: "12px",
            padding: "8px 16px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            margin: 0
          }}>
            {menuItems.map(({ label, href }) => (
              <li key={label} style={{ listStyle: "none" }}>
                <Link
                  to={href}
                  style={{
                    display: "inline-block",
                    minWidth: 140,
                    margin: "0 10px",
                    padding: "10px 24px",
                    background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
                    color: "#fff",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textAlign: "center",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(30,64,175,0.08)",
                    border: "none",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseOver={e => {
                    e.target.style.background = "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)";
                    e.target.style.transform = "scale(1.07)";
                    e.target.style.boxShadow = "0 4px 16px rgba(37,99,235,0.15)";
                  }}
                  onMouseOut={e => {
                    e.target.style.background = "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)";
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 2px 8px rgba(30,64,175,0.08)";
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;