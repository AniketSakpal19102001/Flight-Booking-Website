import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLogoutMutation } from "../redux/api/userSlice";
import { logout } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function NavbarAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!", { autoClose: 1000 });
      navigate("/");
    } catch (error) {
      toast.error("Logout failed! Please try again.");
      console.log("Logout failed", error);
    }
  };

  return (
    <>
      <nav className="relative flex items-center justify-between py-4 border-b-gray-200 text-slate-100 bg-blue-700">
        <div className="ml-6 font-bold">SkyJourney</div>

        {/* Dropdown button for mobile */}
        <div className="block mr-6 md:hidden">
          <button onClick={toggleDropdown}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navbar Links */}
        <div className="md:flex items-center gap-6 mr-6 hidden ">
          <ul className="flex items-center gap-6">
            <li className="list-none">
              <NavLink
                to="/search-flights"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-4 bg-blue-600 rounded-md"
                    : "py-2 px-4 hover:bg-blue-600 rounded-md"
                }
              >
                Search Flights
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-4 bg-blue-600 rounded-md"
                    : "py-2 px-4 hover:bg-blue-600 rounded-md"
                }
              >
                My Bookings
              </NavLink>
            </li>
            <li className="list-none">
              <button
                onClick={handleLogout} // Logout button that navigates to home
                className="py-2 px-4 hover:bg-blue-600 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-700 shadow-lg z-10">
            <ul className="flex flex-col items-center py-4 gap-4">
              <li className="list-none">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/search-flights"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-blue-600 rounded-md"
                      : "block py-2 px-4 hover:bg-blue-600 rounded-md"
                  }
                >
                  Search Flights
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-4 bg-blue-600 rounded-md"
                      : "block py-2 px-4 hover:bg-blue-600 rounded-md"
                  }
                >
                  My Bookings
                </NavLink>
              </li>
              <li className="list-none">
                <button
                  onClick={handleLogout} // Logout button for mobile menu
                  className="block py-2 px-4 hover:bg-blue-600 rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavbarAuth;
