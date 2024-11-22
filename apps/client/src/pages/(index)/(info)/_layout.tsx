import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container max-w-3xl">
      <Outlet />
    </div>
  );
};

export default Layout;
