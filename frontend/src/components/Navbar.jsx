import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import Menu and X icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Manage dropdown state

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  return (
    <>
      <nav className="relative flex items-center justify-between py-4 border-b-gray-200 text-slate-100 bg-blue-700">
        <div className="ml-6 font-bold">SkyJourney</div>

        {/* Dropdown button for mobile */}
        <div className="block md:hidden mr-6">
          <button onClick={toggleDropdown}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navbar Links for desktop */}
        <div className="md:flex items-center gap-6 mr-6 hidden ">
          <ul className="flex items-center gap-6">
            <li className="list-none">
              <NavLink
                to="/login"
                className="py-2 px-4 hover:bg-blue-600 rounded-md"
              >
                Login
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/register"
                className="py-2 px-4 hover:bg-blue-600 rounded-md"
              >
                Register
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/about"
                className="py-2 px-4 hover:bg-blue-600 rounded-md"
              >
                About
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/contact"
                className="py-2 px-4 hover:bg-blue-600 rounded-md"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-700 shadow-lg z-10">
            <ul className="flex flex-col items-center py-4 gap-4">
              <li className="list-none">
                <NavLink
                  to="/login"
                  className="block py-2 px-4 hover:bg-blue-600 rounded-md"
                >
                  Login
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="/register"
                  className="block py-2 px-4 hover:bg-blue-600 rounded-md"
                >
                  Register
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="/about"
                  className="block py-2 px-4 hover:bg-blue-600 rounded-md"
                >
                  About
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="/contact"
                  className="block py-2 px-4 hover:bg-blue-600 rounded-md"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
