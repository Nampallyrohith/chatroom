// Outlet for nested routing content rendering
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Wrapper = () => {
  return (
    <div className="w-full min-h-screen relative rounded">
      <Header />
      <Outlet />
    </div>
  );
};

export default Wrapper;
