import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

export default function MainLayout() {
  return (
    <div className="py-5">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}
