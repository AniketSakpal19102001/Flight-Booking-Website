import { Navigate, Outlet } from "react-router-dom";
import NavbarAuth from "./NavbarAuth";
import { useSelector } from "react-redux";
import Footer from "./Footer";

function AuthLayout() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <NavbarAuth />
      <div>{userInfo ? <Outlet /> : <Navigate to={"/"} />}</div>
      <Footer />
    </>
  );
}

export default AuthLayout;
