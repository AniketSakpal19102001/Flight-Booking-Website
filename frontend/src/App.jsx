import { Routes, Route, Outlet } from "react-router-dom";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Flights from "./pages/Flights";
import AuthLayout from "./components/AuthLayout";
import SearchFlights from "./pages/SearchFlights";
import MyBookings from "./pages/MyBookings";
import Bookings from "./pages/Bookings";
import EditBooking from "./pages/EditBooking";
import ViewTicket from "./pages/ViewTicket";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AuthLayout />}>
          <Route path="/search-flights" element={<SearchFlights />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/booking/:flightId" element={<Bookings />} />
          <Route path="/edit-booking/:bookingId" element={<EditBooking />} />
          <Route path="/view-ticket/:bookingId" element={<ViewTicket />} />
        </Route>

        <Route path="*" element={<div>Error</div>} />
      </Routes>
    </>
  );
}

export default App;
