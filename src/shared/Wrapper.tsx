// Outlet for nested routing content rendering
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <div className="w-full min-h-screen relative rounded">
      <Outlet />
    </div>
  );
};

export default Wrapper;
